import { SimulatorService } from '../../../../../src/credits/simulator/services/simulator.service';
import { ClientService } from '../../../../../src/client/services/client.service';
import { CalculateInterestRateService } from '../../../../../src/credits/interest-rates/services/calculate-interest-rate.service';
import { InsurancesService } from '../../../../../src/insurances/services/insurances.service';
import { InterestCalculationService } from '../../../../../src/credits/simulator/services/interest-calculation.service';
import { InsuranceCalculationService } from '../../../../../src/credits/simulator/services/insurance-calculation.service';
import { PaymentScheduleGenerator } from '../../../../../src/credits/simulator/services/payment-schedule-generator.service';
import { ClientValidationService } from '../../../../../src/credits/simulator/services/client-validation.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateSimulationDto } from '../../../../../src/credits/simulator/dto/create-simulation.dto';
import { SimulationCreditDto } from '../../../../../src/credits/simulator/dto/simulation.dto';

describe('SimulatorService', () => {
  let service: SimulatorService;
  let clientService: ClientService;
  let calculateInterestRateService: CalculateInterestRateService;
  let insuranceService: InsurancesService;
  let interestCalculationService: InterestCalculationService;
  let insuranceCalculationService: InsuranceCalculationService;
  let paymentScheduleGenerator: PaymentScheduleGenerator;
  let clientValidationService: ClientValidationService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimulatorService,
        {
          provide: ClientService,
          useValue: {
            getClientById: jest.fn().mockResolvedValue({
              riskProfile: 'low',
              borrowingCapacity: 1000,
              age: 30,
            }),
          },
        },
        {
          provide: CalculateInterestRateService,
          useValue: {
            calculateInterestRate: jest.fn().mockResolvedValue({ rate: 5 }),
          },
        },
        {
          provide: InsurancesService,
          useValue: {
            getInsuranceByAge: jest
              .fn()
              .mockResolvedValue({ percentage: 0.02 }),
          },
        },
        {
          provide: InterestCalculationService,
          useValue: {
            calculateMonthlyRate: jest.fn().mockReturnValue(0.004),
            calculateMonthlyPayment: jest.fn().mockReturnValue(100),
          },
        },
        {
          provide: InsuranceCalculationService,
          useValue: {
            calculateInsuranceFee: jest.fn().mockReturnValue(2),
          },
        },
        {
          provide: PaymentScheduleGenerator,
          useValue: {
            generateSchedule: jest.fn().mockReturnValue([
              { interest: 5, capital: 50, insurance: 2 },
              { interest: 4, capital: 51, insurance: 2 },
            ]),
          },
        },
        {
          provide: ClientValidationService,
          useValue: {
            validateBorrowingCapacity: jest.fn(),
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

    service = module.get<SimulatorService>(SimulatorService);
    clientService = module.get<ClientService>(ClientService);
    calculateInterestRateService = module.get<CalculateInterestRateService>(
      CalculateInterestRateService,
    );
    insuranceService = module.get<InsurancesService>(InsurancesService);
    interestCalculationService = module.get<InterestCalculationService>(
      InterestCalculationService,
    );
    insuranceCalculationService = module.get<InsuranceCalculationService>(
      InsuranceCalculationService,
    );
    paymentScheduleGenerator = module.get<PaymentScheduleGenerator>(
      PaymentScheduleGenerator,
    );
    clientValidationService = module.get<ClientValidationService>(
      ClientValidationService,
    );
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a simulation correctly', async () => {
    const input: CreateSimulationDto = {
      clientId: 1,
      amount: 1000,
      term: 12,
    };

    const result: SimulationCreditDto = await service.generateSimulation(input);

    expect(result).toHaveProperty('balance');
    expect(result).toHaveProperty('interest');
    expect(result).toHaveProperty('capital');
    expect(result).toHaveProperty('insurance');
    expect(result).toHaveProperty('months');
  });

  it('should call clientService.getClientById with the correct clientId', async () => {
    const input: CreateSimulationDto = { clientId: 1, amount: 1000, term: 12 };
    await service.generateSimulation(input);
    expect(clientService.getClientById).toHaveBeenCalledWith(input.clientId);
  });

  it('should call eventEmitter.emit when generating a simulation', async () => {
    const input: CreateSimulationDto = { clientId: 1, amount: 1000, term: 12 };
    await service.generateSimulation(input);
    expect(eventEmitter.emit).toHaveBeenCalledWith('GENERATE_SIMULATION', {
      riskProfile: 'low',
      borrowingCapacity: 1000,
      age: 30,
    });
  });

  it('should validate the borrowing capacity', async () => {
    const input: CreateSimulationDto = { clientId: 1, amount: 1000, term: 12 };
    await service.generateSimulation(input);
    expect(
      clientValidationService.validateBorrowingCapacity,
    ).toHaveBeenCalledWith(102, 1000);
  });
});
