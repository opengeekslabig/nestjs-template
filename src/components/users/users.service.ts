import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '@components/users/users.repository';
import { RegistrationRequest } from '@components/authentication/dto/request';
import { UserEntities } from '@components/users/entities/user.entities';
import { CryptoService } from '@utils/crypto/crypto.service';
import { userResponse } from '@components/users/mappers/user.mapper';
import { IUserResponse } from '@components/users/interfaces/user.interfaces';
import { UserUpdateRequest } from '@components/users/dto/request';
import { OrderEntities } from '@components/orders/entities/orders.entities';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  createUser(registrationData: RegistrationRequest): Promise<UserEntities> {
    return this.usersRepository.createUser(registrationData);
  }

  getUsers(): Promise<IUserResponse[]> {
    return this.usersRepository
      .getUsers()
      .then((users) => users.length && users.map((el) => userResponse(el)));
  }

  getUserByEmail(login: string): Promise<UserEntities> {
    return this.usersRepository.getUserByLogin(login);
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: string,
  ): Promise<UserEntities> {
    try {
      const user = await this.usersRepository.getUserById(userId);

      await this.verifyToken(refreshToken, user.credentials.refreshToken);
      return user;
    } catch (error) {
      throw new UnauthorizedException('User not found');
    }
  }

  private async verifyToken(
    plainTextToken: string,
    hashedPassword: string,
  ): Promise<void> {
    const isPasswordMatching = await this.cryptoService.verifyPassword(
      hashedPassword,
      plainTextToken,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong jwt token provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUserById(userId: string): Promise<IUserResponse> {
    const user = await this.usersRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return userResponse(user);
  }

  async deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }

  async updateUser(
    body: UserUpdateRequest,
    userId: string,
  ): Promise<IUserResponse> {
    return this.usersRepository
      .updateUser(body, userId)
      .then((res) => userResponse(res));
  }

  async getUserOrders(userId: string): Promise<UserEntities> {
    return this.usersRepository.getUserOrders(userId);
  }
}
