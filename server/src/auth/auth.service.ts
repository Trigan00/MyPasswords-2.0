import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import { v4 } from 'uuid';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user)
      throw new HttpException(
        'Некорректный email или пароль',
        HttpStatus.BAD_REQUEST,
      );

    if (!user.isActivated)
      throw new HttpException('Аккаунт не активирован', HttpStatus.BAD_REQUEST);

    const twoFAtoken = speakeasy.totp({
      secret: user.secret2fa,
      encoding: 'base32',
    });

    if (userDto.code !== twoFAtoken) {
      throw new HttpException('Неверный код', HttpStatus.BAD_REQUEST);
    }

    const tokenValidates = speakeasy.totp.verify({
      secret: user.secret2fa,
      encoding: 'base32',
      token: userDto.code,
      window: 6,
    });

    if (!tokenValidates) {
      throw new HttpException('Неверный код', HttpStatus.BAD_REQUEST);
    }

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      const secretKey = await bcrypt.hash(userDto.password, 6);
      return {
        email: user.email,
        id: user.id,
        token: this.generateToken(user),
        secretKey,
      };
    }
    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }

  async registration(userDto: RegisterUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate)
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    const hashPassword = await bcrypt.hash(userDto.password, 12);
    const activationLink = v4();
    const secret2fa = speakeasy.generateSecret({
      name: 'MyPasswords_2',
      length: 20,
    });

    const QRCodeUrl = await QRCode.toDataURL(secret2fa.otpauth_url);

    await this.mailService.sendVerificationMail(
      userDto.email,
      `${process.env.API_URL}/api/auth/activate/${activationLink}`,
      QRCodeUrl,
    );

    await this.userService.createUser({
      email: userDto.email,
      password: hashPassword,
      activationLink,
      secret2fa: secret2fa.base32,
    });
    return { QRCodeUrl, message: 'Пользователь добавлен. Поддтвердите email!' };
  }

  async activation(res, link: string) {
    const candidate = await this.userService.verifyUser(link);
    if (!candidate)
      throw new HttpException(
        'Invalid activation link',
        HttpStatus.BAD_REQUEST,
      );

    return res.redirect(process.env.CLIENT_URL);
  }

  generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }
}
