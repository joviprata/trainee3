import { Test, TestingModule } from '@nestjs/testing';
import { ProvasController } from './provas.controller';
import { ProvasService } from './provas.service';

describe('ProvasController', () => {
  let controller: ProvasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvasController],
      providers: [ProvasService],
    }).compile();

    controller = module.get<ProvasController>(ProvasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
