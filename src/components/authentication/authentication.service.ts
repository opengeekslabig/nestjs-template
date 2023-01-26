import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthenticationRepository } from '@components/authentication/authentication.repository';
import { UsersService } from '@components/users/users.service';
import { RegistrationRequest } from '@components/authentication/dto/request';
import { CryptoService } from '@utils/crypto/crypto.service';
import { TokenPayload } from '@components/authentication/dto/token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntities } from '@components/users/entities/user.entities';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';
import { userResponse } from '@components/users/mappers/user.mapper';
import { IUserResponse } from '@components/users/interfaces/user.interfaces';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async register(
    registrationData: RegistrationRequest,
  ): Promise<IUserResponse> {
    const hashPassword = await this.cryptoService.hashPassword(
      registrationData.password,
    );

    try {
      const user = await this.usersService.createUser({
        ...registrationData,
        password: hashPassword,
      });
      if (user) {
        return userResponse(user);
      }
    } catch (error) {
      if (error?.parent.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(error?.parent.detail, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getJwtAccessToken(user: UserEntities) {
    const payload: TokenPayload = { userId: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });
    const refreshToken = await this.getJwtRefreshToken(
      user.id,
      user.credentialsId,
    );
    return { ...userResponse(user), accessToken, refreshToken };
  }

  public async getJwtRefreshToken(
    userId: string,
    credentialId: string,
  ): Promise<string> {
    const payload: TokenPayload = { userId };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    const hashedToken = await this.cryptoService.hashPassword(refreshToken);

    await this.authenticationRepository.updateRefreshToken(
      credentialId,
      hashedToken,
    );
    return refreshToken;
  }

  async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<UserEntities> {
    const user = await this.usersService.getUserByEmail(email);

    if (
      !user ||
      !(await this.cryptoService.verifyPassword(
        user.credentials.password,
        plainTextPassword,
      ))
    ) {
      throw new BadRequestException('Invalid credentials.');
    }

    return user;
  }
}
