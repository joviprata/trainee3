import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClientePartialDto } from './dto/update-cliente-partial.dto';
import { UpdateClienteFullDto } from './dto/update-cliente-full.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesService.findOne(+id);
  }

  @Patch(':id')
  updatePartial(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateClientePartialDto: UpdateClientePartialDto,
  ) {
    return this.clientesService.update(id, UpdateClientePartialDto);
  }

  @Put(':id')
  updateFull(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClienteFullDto: UpdateClienteFullDto,
  ) {
    return this.clientesService.update(id, updateClienteFullDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesService.remove(+id);
  }
}
