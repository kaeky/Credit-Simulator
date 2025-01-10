import { Test, TestingModule } from '@nestjs/testing';
import { SimulatorResolver } from '../../../../../credits/simulator/resolvers/simulator.resolver';
import { SimulatorService } from '../../../../../credits/simulator/services/simulator.service';

describe('SimulatorResolver', () => {
  let resolver: SimulatorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimulatorResolver, SimulatorService],
    }).compile();

    resolver = module.get<SimulatorResolver>(SimulatorResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
