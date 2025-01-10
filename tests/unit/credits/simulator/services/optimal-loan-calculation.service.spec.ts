import { OptimalLoanCalculationService } from '../../../../../src/credits/simulator/services/optimal-loan-calculation.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OptimalLoanCalculationServiceSpec', () => {
  let service: OptimalLoanCalculationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptimalLoanCalculationService],
    }).compile();

    service = module.get<OptimalLoanCalculationService>(
      OptimalLoanCalculationService,
    );
  });

  describe('calculateOptimalLoanAmount', () => {
    it('should calculate the optimal loan amount correctly', () => {
      // Arrange
      const debtCapacity = 1000; // Monthly debt capacity
      const annualRate = 0.12; // Annual interest rate
      const termMonths = 24; // Loan term in months
      const insurance = 2; // Insurance percentage

      // Act
      const result = service.calculateOptimalLoanAmount(
        debtCapacity,
        annualRate,
        termMonths,
        insurance,
      );

      // Assert
      expect(result).toBeCloseTo(21484.85); // Expected value
    });

    it('should return 0 if debt capacity is 0', () => {
      // Arrange
      const debtCapacity = 0;
      const annualRate = 0.12;
      const termMonths = 24;
      const insurance = 2;

      // Act
      const result = service.calculateOptimalLoanAmount(
        debtCapacity,
        annualRate,
        termMonths,
        insurance,
      );

      // Assert
      expect(result).toBe(0);
    });

    it('should handle a 0 insurance rate correctly', () => {
      // Arrange
      const debtCapacity = 1000;
      const annualRate = 0.12;
      const termMonths = 24;
      const insurance = 0;

      // Act
      const result = service.calculateOptimalLoanAmount(
        debtCapacity,
        annualRate,
        termMonths,
        insurance,
      );

      // Assert
      expect(result).toBeGreaterThan(0); // Valid result without insurance
    });
  });

  describe('calculateOptimalTerm', () => {
    it('should calculate the optimal term correctly', () => {
      // Arrange
      const debtCapacity = 1000; // Monthly debt capacity
      const loanAmount = 20000; // Loan amount
      const annualRate = 0.12; // Annual interest rate

      // Act
      const result = service.calculateOptimalTerm(
        debtCapacity,
        loanAmount,
        annualRate,
      );

      // Assert
      expect(result).toBe(24); // Closest term in the array [12, 24, 36, 48, 60]
    });

    it('should return the smallest term if calculated term is below minimum', () => {
      // Arrange
      const debtCapacity = 10000; // High capacity
      const loanAmount = 500; // Low loan amount
      const annualRate = 0.12;

      // Act
      const result = service.calculateOptimalTerm(
        debtCapacity,
        loanAmount,
        annualRate,
      );

      // Assert
      expect(result).toBe(12); // Minimum term in the available options
    });

    it('should return the largest term if calculated term exceeds maximum', () => {
      // Arrange
      const debtCapacity = 100; // Low capacity
      const loanAmount = 50000; // High loan amount
      const annualRate = 0.12;

      // Act
      const result = service.calculateOptimalTerm(
        debtCapacity,
        loanAmount,
        annualRate,
      );

      // Assert
      expect(result).toBe(60); // Maximum term in the available options
    });
  });
});
