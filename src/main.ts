import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger';
import { ValidationPipe } from '@nestjs/common';
// import { ValidationPipe } from './validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  // app.useGlobalPipes(new ValidationPipe())
  // app.useGlobalFilters(new AllExceptionsFilter());
  // app.useGlobalFilters(new HttpExceptionFilter());
  const port = process.env.PORT || 3000;
  setupSwagger(app);

  await app.listen(port);
  console.log(`listening on port ${port}\n`);
}
bootstrap();
