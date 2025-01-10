import { Test, TestingModule } from '@nestjs/testing';
import { SimulatorResolver } from './resolvers/simulator.resolver';
import { SimulatorService } from './services/simulator.service';

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
