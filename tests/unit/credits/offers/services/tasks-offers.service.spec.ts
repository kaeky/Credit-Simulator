import { TasksOffersService } from '../../../../../src/credits/offers/services/tasks-offers.service';
import { SimulationLogService } from '../../../../../src/credits/simulator/services/simulation-log.service';
import { CalculateInterestRateService } from '../../../../../src/credits/interest-rates/services/calculate-interest-rate.service';
import { OptimalLoanCalculationService } from '../../../../../src/credits/simulator/services/optimal-loan-calculation.service';
import { InsurancesService } from '../../../../../src/insurances/services/insurances.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { GENERATE_OFFER } from '../../../../../src/credits/offers/constants/offer.constant';
import { CreditStatusEnum } from '../../../../../src/credits/offers/types/credit-status.type';
import { CreditRiskProfileEnum } from '../../../../../src/credits/risk-profile/types/risk-profile.type';

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

  it('should generate offers for each simulation and emit GENERATE_OFFER events', async () => {
    // Arrange
    const simulations = [
      {
        client: {
          id: 1,
          age: 30,
          riskProfile: 'AA',
          borrowingCapacity: 1000000,
        },
      },
      {
        client: {
          id: 2,
          age: 45,
          riskProfile: 'BB',
          borrowingCapacity: 2000000,
        },
      },
    ];

    simulationLogService.getSimulationLog.mockResolvedValue(simulations);
    calculateInterestRateService.basicInterestRate.mockResolvedValue({
      id: 1,
      riskProfile: CreditRiskProfileEnum.AA,
      minRange: 0,
      maxRange: 6999999,
      rate: 0.05,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    insuranceService.getInsuranceByAge.mockResolvedValue({
      id: 1,
      minAge: 31,
      maxAge: 60,
      percentage: 0.01,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    optimalLoanCalculationService.calculateOptimalLoanAmount.mockReturnValue(
      150000,
    );
    optimalLoanCalculationService.calculateOptimalTerm.mockReturnValue(48);

    // Act
    await service.generateOffers();

    // Assert
    expect(simulationLogService.getSimulationLog).toHaveBeenCalled();
    expect(
      calculateInterestRateService.basicInterestRate,
    ).toHaveBeenCalledTimes(simulations.length);
    expect(calculateInterestRateService.basicInterestRate).toHaveBeenCalledWith(
      'AA',
    );
    expect(calculateInterestRateService.basicInterestRate).toHaveBeenCalledWith(
      'BB',
    );
    expect(insuranceService.getInsuranceByAge).toHaveBeenCalledTimes(
      simulations.length,
    );
    expect(insuranceService.getInsuranceByAge).toHaveBeenCalledWith(30);
    expect(insuranceService.getInsuranceByAge).toHaveBeenCalledWith(45);
    expect(
      optimalLoanCalculationService.calculateOptimalLoanAmount,
    ).toHaveBeenCalledTimes(simulations.length);
    expect(
      optimalLoanCalculationService.calculateOptimalTerm,
    ).toHaveBeenCalledTimes(simulations.length);
    expect(eventEmitter.emit).toHaveBeenCalledTimes(simulations.length);
    expect(eventEmitter.emit).toHaveBeenCalledWith(GENERATE_OFFER, {
      amount: 150000,
      clientId: 1,
      status: CreditStatusEnum.ACTIVE,
      term: 48,
    });
    expect(eventEmitter.emit).toHaveBeenCalledWith(GENERATE_OFFER, {
      amount: 150000,
      clientId: 2,
      status: CreditStatusEnum.ACTIVE,
      term: 48,
    });
  });
});
