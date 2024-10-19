import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enables Cross-Origin Resource Sharing (CORS)
  await app.listen(3000);
}
bootstrap();
