import { Module } from '@nestjs/common';
import { UsersService } from '@components/users/users.service';
import { UsersController } from '@components/users/users.controller';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntities } from '@components/users/entities/user.entities';
import { CredentialsEntities } from '@components/authentication/entities/credentials.entities';
import { UsersRepository } from '@components/users/users.repository';
import { CryptoService } from '@utils/crypto/crypto.service';

@Module({
  imports: [SequelizeModule.forFeature([UserEntities, CredentialsEntities])],
  controllers: [UsersController],
  providers: [UsersService, ConfigService, UsersRepository, CryptoService],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
