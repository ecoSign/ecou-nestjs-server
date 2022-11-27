import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger';
import { ValidationPipe } from '@nestjs/common';
// import { ValidationPipe } from './validation.pipe';
import { winstonLogger } from './middlewares/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: winstonLogger });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const port = process.env.PORT || 8000;
  setupSwagger(app);

  await app.listen(port);
  console.log(`listening on port ${port}\n`);
}
bootstrap();
