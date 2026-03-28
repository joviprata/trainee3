import { Injectable } from '@nestjs/common';
import { CreateEstudoDto } from './dto/create-estudo.dto';
import { UpdateEstudoDto } from './dto/update-estudo.dto';

@Injectable()
export class EstudosService {
  create(createEstudoDto: CreateEstudoDto) {
    return 'This action adds a new estudo';
  }

  findAll() {
    return `This action returns all estudos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estudo`;
  }

  update(id: number, updateEstudoDto: UpdateEstudoDto) {
    return `This action updates a #${id} estudo`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudo`;
  }
}
