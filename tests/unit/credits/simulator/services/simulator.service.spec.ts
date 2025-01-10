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
import { CreditRiskProfileEnum } from '../../../../../src/credits/risk-profile/types/risk-profile.type';
import { GENERATE_SIMULATION } from '../../../../../src/credits/simulator/constants/simulator.constant';

jest.mock('../../../client/services/client.service');
jest.mock('../../interest-rates/services/calculate-interest-rate.service');
jest.mock('../../../insurances/services/insurances.service');
jest.mock('./interest-calculation.service');
jest.mock('./insurance-calculation.service');
jest.mock('./payment-schedule-generator.service');
jest.mock('./client-validation.service');

describe('SimulatorService', () => {
  let service: SimulatorService;
  let clientService: jest.Mocked<ClientService>;
  let calculateInterestRateService: jest.Mocked<CalculateInterestRateService>;
  let insuranceService: jest.Mocked<InsurancesService>;
  let interestCalculationService: jest.Mocked<InterestCalculationService>;
  let insuranceCalculationService: jest.Mocked<InsuranceCalculationService>;
  let paymentScheduleGenerator: jest.Mocked<PaymentScheduleGenerator>;
  let clientValidationService: jest.Mocked<ClientValidationService>;
  let eventEmitter: jest.Mocked<EventEmitter2>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimulatorService,
        ClientService,
        CalculateInterestRateService,
        InsurancesService,
        InterestCalculationService,
        InsuranceCalculationService,
        PaymentScheduleGenerator,
        ClientValidationService,
        EventEmitter2,
      ],
    }).compile();

    service = module.get<SimulatorService>(SimulatorService);
    clientService = module.get(ClientService);
    calculateInterestRateService = module.get(CalculateInterestRateService);
    insuranceService = module.get(InsurancesService);
    interestCalculationService = module.get(InterestCalculationService);
    insuranceCalculationService = module.get(InsuranceCalculationService);
    paymentScheduleGenerator = module.get(PaymentScheduleGenerator);
    clientValidationService = module.get(ClientValidationService);
    eventEmitter = module.get(EventEmitter2);
  });

  describe('generateSimulation', () => {
    it('should generate a simulation correctly', async () => {
      // Arrange
      const input: CreateSimulationDto = {
        clientId: 1,
        amount: 100000,
        term: 12,
      };

      const mockClient = {
        id: 1,
        name: 'Carlos A',
        lastName: 'Bautista',
        age: 30,
        riskProfile: CreditRiskProfileEnum.AA,
        borrowingCapacity: 1000000,
        createdAt: new Date('2021-09-01T00:00:00.000Z'),
        updatedAt: new Date('2021-09-01T00:00:00.000Z'),
      };
      const mockRate = {
        id: 1,
        riskProfile: CreditRiskProfileEnum.AA,
        minRange: 0,
        maxRange: 6999999,
        rate: 0.2345,
        createdAt: new Date('2021-09-01T00:00:00.000Z'),
        updatedAt: new Date('2021-09-01T00:00:00.000Z'),
      };
      const mockInsurance = {
        id: 1,
        minAge: 31,
        maxAge: 60,
        percentage: 0.01,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockMonthlyRate = 0.0042;
      const mockMonthlyPayment = 8500;
      const mockInsuranceFee = 85;
      const mockTotalMonthlyPayment = 8585;
      const mockMonths = [
        {
          month: 1,
          interest: 420,
          capital: 8080,
          insurance: 85,
          balance: 91920,
          paid: 8585,
        },
        // Add more months if needed
      ];

      clientService.getClientById.mockResolvedValue(mockClient);
      calculateInterestRateService.calculateInterestRate.mockResolvedValue(
        mockRate,
      );
      insuranceService.getInsuranceByAge.mockResolvedValue(mockInsurance);
      interestCalculationService.calculateMonthlyRate.mockReturnValue(
        mockMonthlyRate,
      );
      interestCalculationService.calculateMonthlyPayment.mockReturnValue(
        mockMonthlyPayment,
      );
      insuranceCalculationService.calculateInsuranceFee.mockReturnValue(
        mockInsuranceFee,
      );
      paymentScheduleGenerator.generateSchedule.mockReturnValue(mockMonths);

      // Act
      const result = await service.generateSimulation(input);

      // Assert
      expect(clientService.getClientById).toHaveBeenCalledWith(input.clientId);
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        GENERATE_SIMULATION,
        mockClient,
      );
      expect(
        calculateInterestRateService.calculateInterestRate,
      ).toHaveBeenCalledWith(input.amount, mockClient.riskProfile);
      expect(insuranceService.getInsuranceByAge).toHaveBeenCalledWith(
        mockClient.age,
      );
      expect(
        interestCalculationService.calculateMonthlyRate,
      ).toHaveBeenCalledWith(mockRate.rate, input.term);
      expect(
        interestCalculationService.calculateMonthlyPayment,
      ).toHaveBeenCalledWith(input.amount, mockMonthlyRate, input.term);
      expect(
        insuranceCalculationService.calculateInsuranceFee,
      ).toHaveBeenCalledWith(mockMonthlyPayment, mockInsurance.percentage);
      expect(
        clientValidationService.validateBorrowingCapacity,
      ).toHaveBeenCalledWith(
        mockTotalMonthlyPayment,
        mockClient.borrowingCapacity,
      );
      expect(paymentScheduleGenerator.generateSchedule).toHaveBeenCalledWith(
        input.amount,
        input.term,
        mockMonthlyPayment,
        mockMonthlyRate,
        mockInsurance.percentage,
      );

      expect(result).toEqual({
        balance: parseFloat((mockTotalMonthlyPayment * input.term).toFixed(2)),
        interest: parseFloat(mockMonths[0].interest.toFixed(2)),
        capital: parseFloat(mockMonths[0].capital.toFixed(2)),
        insurance: parseFloat(mockMonths[0].insurance.toFixed(2)),
        months: mockMonths,
      });
    });
  });
});
