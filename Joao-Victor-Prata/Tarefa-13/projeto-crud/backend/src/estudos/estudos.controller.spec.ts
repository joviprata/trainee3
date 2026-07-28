import { Test, TestingModule } from '@nestjs/testing';
import { EstudosController } from './estudos.controller';
import { EstudosService } from './estudos.service';

describe('EstudosController', () => {
  let controller: EstudosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstudosController],
      providers: [EstudosService],
    }).compile();

    controller = module.get<EstudosController>(EstudosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
