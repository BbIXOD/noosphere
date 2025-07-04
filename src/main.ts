import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DuplicateUniqueExceptionFilter } from './prisma/filters/duplicate-unique-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.useGlobalFilters(new DuplicateUniqueExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
