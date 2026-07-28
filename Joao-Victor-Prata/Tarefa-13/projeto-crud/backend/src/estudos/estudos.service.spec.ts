import { Test, TestingModule } from '@nestjs/testing';
import { EstudosService } from './estudos.service';

describe('EstudosService', () => {
  let service: EstudosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstudosService],
    }).compile();

    service = module.get<EstudosService>(EstudosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
