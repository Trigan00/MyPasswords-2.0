import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { AuthModule } from './auth/auth.module';
import { PasswordsModule } from './passwords/passwords.module';
import { Password } from './passwords/passwords.model';
import { MailModule } from './mail/mail.module';
import { TokenModule } from './token/token.module';
import { Token } from './token/token.model';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      logging: false,
      define: {
        timestamps: false,
      },
      models: [User, Password, Token],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'build'),
    }),
    UsersModule,
    AuthModule,
    PasswordsModule,
    MailModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
