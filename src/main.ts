import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';
// import cookieParser from 'cookie-parser';
import passport from 'passport';
import { YandexStrategy } from './yandex.strategy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // passport.use('yandex', new YandexStrategy());

  // app.use(cookieParser);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  console.log('work');
  await app.listen(3000);
}
bootstrap();
