import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudosService } from './estudos.service';
import { EstudosController } from './estudos.controller';
import { Estudo } from './entities/estudo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudo])],
  controllers: [EstudosController],
  providers: [EstudosService],
})
export class EstudosModule {}
