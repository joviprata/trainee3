import { Injectable } from '@nestjs/common';
import { CreateProvaDto } from './dto/create-prova.dto';
import { UpdateProvaDto } from './dto/update-prova.dto';

@Injectable()
export class ProvasService {
  create(createProvaDto: CreateProvaDto) {
    return 'This action adds a new prova';
  }

  findAll() {
    return `This action returns all provas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prova`;
  }

  update(id: number, updateProvaDto: UpdateProvaDto) {
    return `This action updates a #${id} prova`;
  }

  remove(id: number) {
    return `This action removes a #${id} prova`;
  }
}
