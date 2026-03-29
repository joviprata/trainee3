import { Injectable, NotFoundException } from '@nestjs/common';
import { Estudo } from './entities/estudo.entity';
import { CreateEstudoDto } from './dto/create-estudo.dto';
import { UpdateEstudoDto } from './dto/update-estudo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { DataEstudo } from './entities/data-estudo.entity';

@Injectable()
export class EstudosService {
  constructor(
    @InjectRepository(Estudo)
    private readonly estudoRepository: Repository<Estudo>,
    // private readonly datasEstudoRepository: Repository<DataEstudo>,
  ) {}

  create(createEstudoDto: CreateEstudoDto) {
    const estudo = this.estudoRepository.create(createEstudoDto);
    return this.estudoRepository.save(estudo);
  }

  async findAll() {
    const estudo = await this.estudoRepository.find();
    return estudo;
  }

  async findOne(id: number) {
    const estudo = await this.estudoRepository.findOneBy({ id });

    if (!estudo) {
      throw new NotFoundException('Não existe estudo com este id');
    }
    return estudo;
  }

  async update(id: number, updateEstudoDto: UpdateEstudoDto): Promise<Estudo> {
    const estudo = await this.estudoRepository.findOne({
      where: { id },
    });

    if (!estudo) {
      throw new NotFoundException('Não existe estudo com este id');
    }

    Object.assign(estudo, updateEstudoDto);
    return this.estudoRepository.save(estudo);
  }

  async remove(id: number): Promise<void> {
    const resultado = await this.estudoRepository.delete(id);

    if (resultado.affected === 0) {
      throw new NotFoundException('Estudo não encontrado');
    }
  }
}
