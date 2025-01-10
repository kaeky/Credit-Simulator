import { InsuranceCalculationService } from '../../../../../src/credits/simulator/services/insurance-calculation.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('InsuranceCalculationService', () => {
  let service: InsuranceCalculationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsuranceCalculationService],
    }).compile();

    service = module.get<InsuranceCalculationService>(
      InsuranceCalculationService,
    );
  });

  describe('calculateInsuranceFee', () => {
    it('should calculate the insurance fee correctly', () => {
      // Arrange
      const monthlyPayment = 1000;
      const percentage = 5;

      // Act
      const result = service.calculateInsuranceFee(monthlyPayment, percentage);

      // Assert
      expect(result).toBe(50); // 1000 * (5 / 100)
    });

    it('should return 0 if percentage is 0', () => {
      // Arrange
      const monthlyPayment = 1000;
      const percentage = 0;

      // Act
      const result = service.calculateInsuranceFee(monthlyPayment, percentage);

      // Assert
      expect(result).toBe(0);
    });

    it('should handle negative percentages', () => {
      // Arrange
      const monthlyPayment = 1000;
      const percentage = -5;

      // Act
      const result = service.calculateInsuranceFee(monthlyPayment, percentage);

      // Assert
      expect(result).toBe(-50); // 1000 * (-5 / 100)
    });

    it('should handle a monthlyPayment of 0', () => {
      // Arrange
      const monthlyPayment = 0;
      const percentage = 5;

      // Act
      const result = service.calculateInsuranceFee(monthlyPayment, percentage);

      // Assert
      expect(result).toBe(0);
    });
  });
});
