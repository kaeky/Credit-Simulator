import { InterestCalculationService } from '../../../../../src/credits/simulator/services/interest-calculation.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('InterestCalculationService', () => {
  let service: InterestCalculationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterestCalculationService],
    }).compile();

    service = module.get<InterestCalculationService>(
      InterestCalculationService,
    );
  });

  describe('calculateMonthlyRate', () => {
    it('should calculate the monthly rate correctly', () => {
      // Arrange
      const rate = 0.12; // Annual rate
      const term = 12; // Months

      // Act
      const result = service.calculateMonthlyRate(rate, term);

      // Assert
      expect(result).toBeCloseTo(0.01); // 0.12 / 12
    });
  });

  describe('calculateMonthlyPayment', () => {
    it('should calculate the monthly payment correctly', () => {
      // Arrange
      const amount = 100000; // Loan amount
      const monthlyRate = 0.01; // Monthly interest rate
      const term = 12; // Months

      // Act
      const result = service.calculateMonthlyPayment(amount, monthlyRate, term);

      // Assert
      expect(result).toBeCloseTo(8884.87886783416); // Expected value
    });

    it('should handle a monthly rate of 0', () => {
      // Arrange
      const amount = 100000;
      const monthlyRate = 0;
      const term = 12;

      // Act
      const result = service.calculateMonthlyPayment(amount, monthlyRate, term);

      // Assert
      expect(result).toBe(0); // No interest, no payment
    });
  });
});
