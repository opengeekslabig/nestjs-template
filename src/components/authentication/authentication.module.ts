import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';
import { AuthenticationRepository } from '@components/authentication/authentication.repository';
import { CryptoService } from '@utils/crypto/crypto.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CredentialsEntities } from '@components/authentication/entities/credentials.entities';

@Module({
  imports: [
    SequelizeModule.forFeature([CredentialsEntities]),
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.register({}),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    AuthenticationRepository,
    CryptoService,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
