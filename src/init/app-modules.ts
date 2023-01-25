import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

export const initAppModules = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `${join(__dirname, '../../env/')}${
      !process.env.NODE_ENV ? '.env.production' : `.env.${process.env.NODE_ENV}`
    }`,
  }),
];
