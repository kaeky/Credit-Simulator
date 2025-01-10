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
    return (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  }
}
