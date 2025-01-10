import { ClientValidationService } from '../../../../../src/credits/simulator/services/client-validation.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

describe('ClientValidationService', () => {
  let service: ClientValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientValidationService],
    }).compile();

    service = module.get<ClientValidationService>(ClientValidationService);
  });

  describe('validateBorrowingCapacity', () => {
    it('should not throw an error if monthlyPayment is less than or equal to borrowingCapacity', () => {
      // Arrange
      const monthlyPayment = 1000;
      const borrowingCapacity = 1500;

      // Act & Assert
      expect(() =>
        service.validateBorrowingCapacity(monthlyPayment, borrowingCapacity),
      ).not.toThrow();
    });

    it('should throw BadRequestException if monthlyPayment is greater than borrowingCapacity', () => {
      // Arrange
      const monthlyPayment = 2000;
      const borrowingCapacity = 1500;

      // Act & Assert
      expect(() =>
        service.validateBorrowingCapacity(monthlyPayment, borrowingCapacity),
      ).toThrow(BadRequestException);

      expect(() =>
        service.validateBorrowingCapacity(monthlyPayment, borrowingCapacity),
      ).toThrow('The monthly payment is higher than the borrowing capacity');
    });
  });
});
