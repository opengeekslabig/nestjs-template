import { ConfigModule } from '@nestjs/config';

export const initAppModules = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
];
