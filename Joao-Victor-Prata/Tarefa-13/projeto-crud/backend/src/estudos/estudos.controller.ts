import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstudosService } from './estudos.service';
import { CreateEstudoDto } from './dto/create-estudo.dto';
import { UpdateEstudoDto } from './dto/update-estudo.dto';

@Controller('estudos')
export class EstudosController {
  constructor(private readonly estudosService: EstudosService) {}

  @Post()
  create(@Body() createEstudoDto: CreateEstudoDto) {
    return this.estudosService.create(createEstudoDto);
  }

  @Get()
  findAll() {
    return this.estudosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstudoDto: UpdateEstudoDto) {
    return this.estudosService.update(+id, updateEstudoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudosService.remove(+id);
  }
}
