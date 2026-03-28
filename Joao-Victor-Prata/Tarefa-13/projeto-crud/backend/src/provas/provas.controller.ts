import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProvasService } from './provas.service';
import { CreateProvaDto } from './dto/create-prova.dto';
import { UpdateProvaDto } from './dto/update-prova.dto';

@Controller('provas')
export class ProvasController {
  constructor(private readonly provasService: ProvasService) {}

  @Post()
  create(@Body() createProvaDto: CreateProvaDto) {
    return this.provasService.create(createProvaDto);
  }

  @Get()
  findAll() {
    return this.provasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProvaDto: UpdateProvaDto) {
    return this.provasService.update(+id, updateProvaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provasService.remove(+id);
  }
}
