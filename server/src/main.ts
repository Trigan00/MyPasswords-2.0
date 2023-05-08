import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import fs from 'fs';
// import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.create(AppModule, {
  //   httpsOptions: {
  //     key: fs.readFileSync('/etc/letsencrypt/live/ayaz-test.ru/privkey.pem'),
  //     cert: fs.readFileSync('/etc/letsencrypt/live/ayaz-test.ru/fullchain.pem'),
  //   },
  // });

  app.setGlobalPrefix('api');
  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  });
  app.use(cookieParser());
  // app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
}
bootstrap();
