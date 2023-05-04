export interface IEncryptedPassword {
  id: number;
  title: string;
  passwordStrength: string;
}

export interface IDecryptedPassword extends IEncryptedPassword {
  login: string;
  password: string;
}

export interface AddPasswordDto {
  title: string;
  password: string;
  login: string;
}

export interface UpdatePasswordDto extends AddPasswordDto {
  id: number;
}

export interface IGeneratedPassword {
  password: string;
}
