import { Injectable } from '@nestjs/common';
import { InterestCalculationInterface } from '../interfaces/interest-calculation.interface';

@Injectable()
export class InterestCalculationService
  implements InterestCalculationInterface
{
  calculateMonthlyRate(rate: number, term: number): number {
    return rate / term;
  }

  calculateMonthlyPayment(
    amount: number,
    monthlyRate: number,
    term: number,
  ): number {
    if (monthlyRate === 0) {
      return 0;
    }
    return (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  }
}
