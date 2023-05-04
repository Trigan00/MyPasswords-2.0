import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  // @IsString({ message: 'Должно быть строкой' })
  // @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  // @Length(6, 16, { message: 'Не меньше 6 и не больше 16' })
  readonly password: string;
  readonly activationLink: string;
  readonly secret2fa: string;
}
