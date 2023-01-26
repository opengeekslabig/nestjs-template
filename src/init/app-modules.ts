import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Logger } from '@nestjs/common';
import { UserEntities } from '@components/users/entities/user.entities';
import { CredentialsEntities } from 'src/components/authentication/entities/credentials.entities';

export const initAppModules = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  SequelizeModule.forRoot({
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_BASE,
    host: process.env.PG_HOST,
    port: +process.env.PG_PORT,
    dialect: 'postgres',
    dialectOptions:
      process.env.NODE_ENV === 'production' || !process.env.NODE_ENV
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : undefined,
    pool: { max: 400, min: 0, acquire: 80000, idle: 10000 },
    define: {
      timestamps: true,
      underscored: true,
    },
    logging: (message) => {
      Logger.debug(message);
    },
    synchronize: true,
    autoLoadModels: true,
    models: [UserEntities, CredentialsEntities],
  }),
];
