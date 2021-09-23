import { Test, TestingModule } from '@nestjs/testing';
import { IncomesController } from './incomes.controller';
import { MockIncomesModule } from './incomes.module.mock';
import { IncomesService } from './incomes.service';

describe('IncomesController', () => {
  let controller: IncomesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomesController],
      providers: [IncomesService],
      imports: [MockIncomesModule],
    }).compile();

    controller = module.get<IncomesController>(IncomesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
