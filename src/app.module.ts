import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { initAppModules } from './init/app-modules';

@Module({
  imports: [...initAppModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
