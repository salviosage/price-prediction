import { Test, TestingModule } from '@nestjs/testing';
import { MockIncomesModule } from './incomes.module.mock';
import { IncomesService } from './incomes.service';

describe('IncomesService', () => {
  let service: IncomesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockIncomesModule],
      providers: [IncomesService],
    }).compile();

    service = module.get<IncomesService>(IncomesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
