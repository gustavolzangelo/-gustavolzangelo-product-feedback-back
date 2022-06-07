import { IsEmail, IsNotEmpty } from 'class-validator'

export class UserCreateDto {
  @IsEmail()
  email: string
  @IsNotEmpty()
  username: string
  @IsNotEmpty()
  password: string
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  surname: string
}
