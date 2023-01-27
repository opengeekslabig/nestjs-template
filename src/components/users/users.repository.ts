import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntities } from '@components/users/entities/user.entities';
import { InjectModel } from '@nestjs/sequelize';
import { RegistrationRequest } from '@components/authentication/dto/request';
import { CredentialsEntities } from '@components/authentication/entities/credentials.entities';
import { UserUpdateRequest } from '@components/users/dto/request';
import { Sequelize } from 'sequelize-typescript';
import { OrderEntities } from '@components/orders/entities/orders.entities';
import { OrderItemsEntities } from '@components/orders/entities/orderItems.entities';
import { ProductEntities } from '@components/products/entities/product.entities';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(UserEntities)
    private readonly userModel: typeof UserEntities,
    @InjectModel(CredentialsEntities)
    private readonly credentialsEntities: typeof CredentialsEntities,
    private sequelize: Sequelize,
  ) {}

  async createUser(
    registrationData: RegistrationRequest,
  ): Promise<UserEntities> {
    const { password } = registrationData;
    return await this.userModel.create(
      {
        password,
        ...registrationData,
        lastOnline: new Date(),
        credentials: { password },
      },
      {
        include: [
          {
            model: CredentialsEntities,
          },
        ],
      },
    );
  }

  async getUsers(): Promise<UserEntities[]> {
    return this.userModel.findAll();
  }

  getUserByLogin(login: string): Promise<UserEntities> {
    return this.userModel.findOne({
      where: {
        login,
      },
      include: [{ model: CredentialsEntities }],
    });
  }

  getUserById(userId: string): Promise<UserEntities> {
    return this.userModel.findOne({
      where: { id: userId },
      include: [{ model: CredentialsEntities }],
    });
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userModel.destroy({
      where: { id: userId },
      force: true,
    });
  }

  async updateUser(
    body: UserUpdateRequest,
    userId: string,
  ): Promise<UserEntities> {
    const { password } = body;
    try {
      return await this.sequelize.transaction(async (t) => {
        await this.userModel.update(
          { password, ...body },
          { where: { id: userId }, returning: true, transaction: t },
        );
        const updateUser = await this.userModel.findOne({
          where: {
            id: userId,
          },
          transaction: t,
        });
        if (password) {
          await this.credentialsEntities.update(
            { password },
            {
              where: { id: updateUser.credentialsId },
              transaction: t,
            },
          );
        }
        return updateUser;
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getUserOrders(userId: string): Promise<UserEntities> {
    return this.userModel.findOne({
      where: { id: userId },
      include: [
        {
          model: OrderEntities,
          attributes: {
            exclude: ['updatedAt'],
          },
          include: [
            {
              model: OrderItemsEntities,
              include: [
                {
                  model: ProductEntities,
                },
              ],
            },
          ],
        },
      ],
    });
  }
}
