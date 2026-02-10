import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  create(createClienteDto: CreateClienteDto) {
    return 'Esta ação adiciona um novo cliente';
  }

  findAll() {
    return `Esta ação lista todos os clientes`;
  }

  findOne(id: number) {
    return `Esta ação retorna um cliente de id #${id}`;
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `Esta ação atualiza um cliente de id #${id}`;
  }

  remove(id: number) {
    return `Esta ação remove um cliente de id #${id}`;
  }
}
