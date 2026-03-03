import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClientePartialDto } from './dto/update-cliente-partial.dto';
import { UpdateClienteFullDto } from './dto/update-cliente-full.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  findOne(id: number): Promise<Cliente | null> {
    return this.clienteRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const resultado = await this.clienteRepository.delete(id);

    if (resultado.affected === 0) {
      throw new NotFoundException('Cliente não encontrado');
    }
  }

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const existe = await this.clienteRepository.findOne({
      where: { email: createClienteDto.email },
    });

    if (existe) {
      throw new ConflictException('Email já cadastrado');
    }

    const cliente = this.clienteRepository.create(createClienteDto);
    return this.clienteRepository.save(cliente);
  }

  async update(
    id: number,
    updateClienteDto: UpdateClientePartialDto | UpdateClienteFullDto,
  ): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
    });

    if (!cliente) {
      throw new NotFoundException('Não existe cliente com este id');
    }

    if (updateClienteDto.email) {
      const emailEmUso = await this.clienteRepository.findOne({
        where: { email: updateClienteDto.email },
      });

      if (emailEmUso && emailEmUso.id !== id) {
        throw new ConflictException('Email já cadastrado por outro cliente');
      }
    }

    Object.assign(cliente, updateClienteDto);
    return this.clienteRepository.save(cliente);
  }
}
