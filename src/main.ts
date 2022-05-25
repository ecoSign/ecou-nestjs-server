import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './util/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  setupSwagger(app);

  await app.listen(port);
  console.log(`listening on port ${port}\n`);
}
bootstrap();
