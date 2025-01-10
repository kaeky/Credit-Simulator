import { PaymentScheduleGenerator } from '../../../../../src/credits/simulator/services/payment-schedule-generator.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('PaymentScheduleGenerator', () => {
  let service: PaymentScheduleGenerator;

  beforeEach(async () => {
    service = new PaymentScheduleGenerator();
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentScheduleGenerator],
    }).compile();

    service = module.get<PaymentScheduleGenerator>(PaymentScheduleGenerator);
  });

  describe('generateSchedule', () => {
    it('should generate a correct payment schedule for a standard case', () => {
      // Arrange
      const amount = 10000; // Loan amount
      const term = 12; // Loan term in months
      const monthlyPayment = 900; // Monthly payment
      const monthlyRate = 0.01; // Monthly interest rate (1%)
      const percentage = 2; // Insurance percentage

      // Act
      const schedule = service.generateSchedule(
        amount,
        term,
        monthlyPayment,
        monthlyRate,
        percentage,
      );

      // Assert
      expect(schedule).toHaveLength(term); // Ensure correct number of months
      expect(schedule[0].month).toBe(1); // First month
      expect(schedule[term - 1].month).toBe(term); // Last month
      expect(schedule[0].balance).toBeLessThan(amount); // Balance decreases
      expect(schedule[term - 1].balance).toBe(0); // Final balance is 0
    });

    it('should handle edge case of 0 loan amount', () => {
      // Arrange
      const amount = 0;
      const term = 12;
      const monthlyPayment = 900;
      const monthlyRate = 0.01;
      const percentage = 2;

      // Act
      const schedule = service.generateSchedule(
        amount,
        term,
        monthlyPayment,
        monthlyRate,
        percentage,
      );

      // Assert
      expect(schedule).toHaveLength(term);
      expect(schedule.every((m) => m.balance === 0)).toBeTruthy();
      expect(schedule.every((m) => m.paid === 0)).toBeFalsy();
    });

    it('should calculate insurance correctly', () => {
      // Arrange
      const amount = 10000;
      const term = 12;
      const monthlyPayment = 900;
      const monthlyRate = 0.01;
      const percentage = 2;

      // Act
      const schedule = service.generateSchedule(
        amount,
        term,
        monthlyPayment,
        monthlyRate,
        percentage,
      );

      // Assert
      const firstMonth = schedule[0];
      const expectedInsurance = (monthlyPayment + firstMonth.interest) * 0.02;
      expect(firstMonth.insurance).toBeCloseTo(expectedInsurance, 2);
    });

    it('should round all financial values to two decimal places', () => {
      // Arrange
      const amount = 12345.67;
      const term = 12;
      const monthlyPayment = 1000.89;
      const monthlyRate = 0.01234;
      const percentage = 1.5;

      // Act
      const schedule = service.generateSchedule(
        amount,
        term,
        monthlyPayment,
        monthlyRate,
        percentage,
      );

      // Assert
      schedule.forEach((month) => {
        expect(month.interest).toBe(parseFloat(month.interest.toFixed(2)));
        expect(month.capital).toBe(parseFloat(month.capital.toFixed(2)));
        expect(month.insurance).toBe(parseFloat(month.insurance.toFixed(2)));
        expect(month.balance).toBe(parseFloat(month.balance.toFixed(2)));
        expect(month.paid).toBe(parseFloat(month.paid.toFixed(2)));
      });
    });

    it('should ensure balance never becomes negative', () => {
      // Arrange
      const amount = 10000;
      const term = 12;
      const monthlyPayment = 1200; // High payment to ensure early payoff
      const monthlyRate = 0.01;
      const percentage = 2;

      // Act
      const schedule = service.generateSchedule(
        amount,
        term,
        monthlyPayment,
        monthlyRate,
        percentage,
      );

      // Assert
      schedule.forEach((month) => {
        expect(month.balance).toBeGreaterThanOrEqual(0); // No negative balances
      });
    });
  });
});
