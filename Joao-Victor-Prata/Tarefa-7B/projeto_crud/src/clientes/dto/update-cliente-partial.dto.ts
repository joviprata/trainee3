import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateClientePartialDto extends PartialType(CreateClienteDto) {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
