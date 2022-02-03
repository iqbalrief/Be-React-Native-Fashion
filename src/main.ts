import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AtGUard } from './auth/common/guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  // const reflector = new Reflector()
  // app.useGlobalGuards(new AtGUard(reflector));
  await app.listen(3000);
  app.enableCors({
    allowedHeaders: 'Content-Type, Accept, Authorization',
    origin: 'http://192.168.1.10:3000',
    credentials: true,
    methods: 'POST,GET,DELETE,PATCH,OPTIONS,PUT',
  });
}
bootstrap();
