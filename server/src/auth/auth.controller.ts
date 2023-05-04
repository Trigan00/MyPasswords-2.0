import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/publicRoutes-decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  @Post('login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  @Post('registration')
  registration(@Body() userDto: RegisterUserDto) {
    return this.authService.registration(userDto);
  }

  @Public()
  @HttpCode(HttpStatus.PERMANENT_REDIRECT)
  @Get('activate/:link')
  activation(@Res() res, @Param('link') link: string) {
    return this.authService.activation(res, link);
  }
}
