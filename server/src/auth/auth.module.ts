import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
// import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './jwt-auth.guards';
import { MailModule } from 'src/mail/mail.module';
import { TokenService } from 'src/token/token.service';
import { TokenModule } from 'src/token/token.module';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
  imports: [
    UsersModule,
    MailModule,
    TokenModule,
    // JwtModule.register({
    //   secret: process.env.jwtSecret || 'SECRET',
    //   signOptions: {
    //     expiresIn: '24h', //change
    //   },
    // }),
  ],
})
export class AuthModule {}
