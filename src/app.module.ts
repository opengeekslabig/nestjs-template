import { Module } from '@nestjs/common';
import { initAppModules } from './init/app-modules';
import { AuthenticationModule } from '@components/authentication/authentication.module';
import { UsersModule } from '@components/users/users.module';

@Module({
  imports: [...initAppModules, AuthenticationModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
