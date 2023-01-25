import { INestApplication } from '@nestjs/common';
import { buildDocs } from './swagger/docs.builder';

export const initializer = (app: INestApplication) => {
  app.setGlobalPrefix('api');

  if (process.env.NODE_ENV !== 'production') {
    buildDocs(app);
  }
};
