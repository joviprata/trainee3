import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEstudoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly conteudo: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  readonly anotacoes?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly materia: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  readonly professor?: string;

  @IsNumber()
  @IsNotEmpty()
  readonly dificuldade: number;

  @IsNumber()
  @IsOptional()
  readonly prova_id?: number;
}
