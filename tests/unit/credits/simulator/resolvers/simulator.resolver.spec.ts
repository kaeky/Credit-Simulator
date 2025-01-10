import { SimulatorResolver } from '../../../../../src/credits/simulator/resolvers/simulator.resolver';
import { Test, TestingModule } from '@nestjs/testing';
import { SimulatorService } from '../../../../../src/credits/simulator/services/simulator.service';
import { CreateSimulationDto } from '../../../../../src/credits/simulator/dto/create-simulation.dto';
import { SimulationCreditDto } from '../../../../../src/credits/simulator/dto/simulation.dto';

describe('SimulatorResolver', () => {
  let resolver: SimulatorResolver;
  let simulatorService: jest.Mocked<SimulatorService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimulatorResolver,
        {
          provide: SimulatorService,
          useValue: {
            generateSimulation: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<SimulatorResolver>(SimulatorResolver);
    simulatorService = module.get(SimulatorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call simulatorService.generateSimulation with correct input and return the result', async () => {
    // Arrange
    const input: CreateSimulationDto = {
      amount: 100000,
      term: 12,
      clientId: 1,
    };

    const result: SimulationCreditDto = {
      balance: 117774.74,
      interest: 14344.4,
      capital: 100000,
      insurance: 3860.66,
      months: [
        {
          month: 1,
          interest: 2125,
          capital: 7403.7,
          insurance: 349.61,
          balance: 92596.3,
          paid: 9878.31,
        },
        {
          month: 2,
          interest: 1967.67,
          capital: 7561.03,
          insurance: 344.89,
          balance: 85035.27,
          paid: 9873.59,
        },
        {
          month: 3,
          interest: 1807,
          capital: 7721.7,
          insurance: 340.07,
          balance: 77313.57,
          paid: 9868.77,
        },
        {
          month: 4,
          interest: 1642.91,
          capital: 7885.79,
          insurance: 335.15,
          balance: 69427.78,
          paid: 9863.85,
        },
        {
          month: 5,
          interest: 1475.34,
          capital: 8053.36,
          insurance: 330.12,
          balance: 61374.42,
          paid: 9858.82,
        },
        {
          month: 6,
          interest: 1304.21,
          capital: 8224.49,
          insurance: 324.99,
          balance: 53149.93,
          paid: 9853.69,
        },
        {
          month: 7,
          interest: 1129.44,
          capital: 8399.26,
          insurance: 319.74,
          balance: 44750.66,
          paid: 9848.44,
        },
        {
          month: 8,
          interest: 950.95,
          capital: 8577.75,
          insurance: 314.39,
          balance: 36172.91,
          paid: 9843.09,
        },
        {
          month: 9,
          interest: 768.67,
          capital: 8760.03,
          insurance: 308.92,
          balance: 27412.89,
          paid: 9837.62,
        },
        {
          month: 10,
          interest: 582.52,
          capital: 8946.18,
          insurance: 303.34,
          balance: 18466.71,
          paid: 9832.04,
        },
        {
          month: 11,
          interest: 392.42,
          capital: 9136.28,
          insurance: 297.63,
          balance: 9330.43,
          paid: 9826.33,
        },
        {
          month: 12,
          interest: 198.27,
          capital: 9330.43,
          insurance: 291.81,
          balance: 0,
          paid: 9820.51,
        },
      ],
    };

    simulatorService.generateSimulation.mockResolvedValue(result);

    // Act
    const response = await resolver.generateSimulation(input);

    // Assert
    expect(simulatorService.generateSimulation).toHaveBeenCalledWith(input);
    expect(simulatorService.generateSimulation).toHaveBeenCalledTimes(1);
    expect(response).toEqual(result);
  });
});
