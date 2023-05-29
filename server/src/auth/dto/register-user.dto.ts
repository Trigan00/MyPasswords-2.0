import { IsString, IsEmail, Length, Matches } from 'class-validator';

export class RegisterUserDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @Length(12, 30, { message: 'Не меньше 12 и не больше 30' })
  @Matches(/(?=.*\d).*$/, {
    message: 'Необходимо наличие цифр',
  })
  @Matches(/(?=.*[\W]).*$/, {
    message: 'Необходимо наличие специальных знаков',
  })
  @Matches(/(?=.*[a-zA-Z]).*$/, {
    message: 'Необходимо наличие символов латинского алфавита',
  })
  readonly password: string;
}
