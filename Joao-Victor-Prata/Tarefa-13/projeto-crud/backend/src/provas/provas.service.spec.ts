import { Test, TestingModule } from '@nestjs/testing';
import { ProvasService } from './provas.service';

describe('ProvasService', () => {
  let service: ProvasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProvasService],
    }).compile();

    service = module.get<ProvasService>(ProvasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
