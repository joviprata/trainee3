import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClientePartialDto } from './dto/update-cliente-partial.dto';
import { UpdateClienteFullDto } from './dto/update-cliente-full.dto';
import { ClientesRepository } from './clientes.repository';

@Injectable()
export class ClientesService {
  constructor(private clienteRepository: ClientesRepository) {}

  findAll(): Cliente[] {
    return this.clienteRepository.find();
  }

  findOne(id: number): Cliente {
    const cliente = this.clienteRepository.findOneBy({ id });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return cliente;
  }

  remove(id: number): void {
    const resultado = this.clienteRepository.delete(id);

    if (resultado.affected === 0) {
      throw new NotFoundException('Cliente não encontrado');
    }
  }

  create(createClienteDto: CreateClienteDto): Cliente {
    const existe = this.clienteRepository.findOneBy({
      email: createClienteDto.email,
    });

    if (existe) {
      throw new ConflictException('Email já cadastrado');
    }

    const cliente = this.clienteRepository.create(createClienteDto);
    return this.clienteRepository.save(cliente);
  }

  update(
    id: number,
    updateClienteDto: UpdateClientePartialDto | UpdateClienteFullDto,
  ): Cliente {
    const cliente = this.clienteRepository.findOneBy({ id });

    if (!cliente) {
      throw new NotFoundException('Não existe cliente com este id');
    }

    if (updateClienteDto.email) {
      const emailEmUso = this.clienteRepository.findOneBy({
        email: updateClienteDto.email,
      });

      if (emailEmUso && emailEmUso.id !== id) {
        throw new ConflictException('Email já cadastrado por outro cliente');
      }
    }

    Object.assign(cliente, updateClienteDto);
    return this.clienteRepository.save(cliente);
  }
}
