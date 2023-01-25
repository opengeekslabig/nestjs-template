import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializer } from './init/initializer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const logger = new Logger('Startup');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  initializer(app);

  const PORT = process.env.PORT || 5000;

  await app.listen(PORT);

  logger.log(`App is listening on port ${PORT}`);
}
bootstrap().then();
