import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpModule } from '@nestjs/axios';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://finals-gateway.onrender.com', // Gateway's domain
    methods: 'GET, POST, PUT, DELETE', // Customize allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Customize allowed headers
  });
  await app.listen(3000);
}
bootstrap();
