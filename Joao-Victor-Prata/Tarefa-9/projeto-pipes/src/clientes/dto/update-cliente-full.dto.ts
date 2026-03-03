import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class UpdateClienteFullDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
