import { TasksOffersService } from '../../../../../src/credits/offers/services/tasks-offers.service';
import { SimulationLogService } from '../../../../../src/credits/simulator/services/simulation-log.service';
import { CalculateInterestRateService } from '../../../../../src/credits/interest-rates/services/calculate-interest-rate.service';
import { OptimalLoanCalculationService } from '../../../../../src/credits/simulator/services/optimal-loan-calculation.service';
import { InsurancesService } from '../../../../../src/insurances/services/insurances.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';

describe('TasksOffersService', () => {
  let service: TasksOffersService;
  let simulationLogService: jest.Mocked<SimulationLogService>;
  let calculateInterestRateService: jest.Mocked<CalculateInterestRateService>;
  let optimalLoanCalculationService: jest.Mocked<OptimalLoanCalculationService>;
  let insuranceService: jest.Mocked<InsurancesService>;
  let eventEmitter: jest.Mocked<EventEmitter2>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksOffersService,
        {
          provide: SimulationLogService,
          useValue: {
            getSimulationLog: jest.fn(),
          },
        },
        {
          provide: CalculateInterestRateService,
          useValue: {
            basicInterestRate: jest.fn(),
          },
        },
        {
          provide: OptimalLoanCalculationService,
          useValue: {
            calculateOptimalLoanAmount: jest.fn(),
            calculateOptimalTerm: jest.fn(),
          },
        },
        {
          provide: InsurancesService,
          useValue: {
            getInsuranceByAge: jest.fn(),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksOffersService>(TasksOffersService);
    simulationLogService = module.get(SimulationLogService);
    calculateInterestRateService = module.get(CalculateInterestRateService);
    optimalLoanCalculationService = module.get(OptimalLoanCalculationService);
    insuranceService = module.get(InsurancesService);
    eventEmitter = module.get(EventEmitter2);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
