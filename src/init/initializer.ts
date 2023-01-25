import { INestApplication } from '@nestjs/common';
import { buildDocs } from './swagger/docs.builder';

export const initializer = (app: INestApplication) => {
  app.setGlobalPrefix('api');
  buildDocs(app);
};
