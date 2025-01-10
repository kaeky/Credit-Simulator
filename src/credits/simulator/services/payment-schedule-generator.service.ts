import { Injectable } from '@nestjs/common';
import { SimulationMonthDto } from '../dto/simulation.dto';

@Injectable()
export class PaymentScheduleGenerator {
  generateSchedule(
    amount: number,
    term: number,
    monthlyPayment: number,
    monthlyRate: number,
    percentage: number,
  ): SimulationMonthDto[] {
    let balance = amount;
    const months: SimulationMonthDto[] = [];

    for (let month = 1; month <= term; month++) {
      const interest = balance * monthlyRate;
      const capital = monthlyPayment - interest;
      const insurance = (monthlyPayment + interest) * (percentage / 100);

      balance -= capital;

      months.push({
        month,
        interest: parseFloat(interest.toFixed(2)),
        capital: parseFloat(capital.toFixed(2)),
        insurance: parseFloat(insurance.toFixed(2)),
        balance: parseFloat(balance > 0 ? balance.toFixed(2) : '0'),
        paid: parseFloat((capital + interest + insurance).toFixed(2)),
      });
    }

    return months;
  }
}
