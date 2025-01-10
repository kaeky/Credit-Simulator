import { Injectable } from '@nestjs/common';
import { OptimalLoanCalculationInterface } from '../interfaces/optimal-loan-calculation.interface';

@Injectable()
export class OptimalLoanCalculationService
  implements OptimalLoanCalculationInterface
{
  calculateOptimalLoanAmount(
    debtCapacity: number,
    annualRate: number,
    termMonths: number,
    insurance: number,
  ): number {
    const insurancePercent = insurance / 12 / 100;
    const monthlyRate = annualRate / 12;
    return (
      (debtCapacity / (monthlyRate + insurancePercent)) *
      (1 - Math.pow(1 + (monthlyRate + insurancePercent), -termMonths))
    );
  }

  calculateOptimalTerm(
    debtCapacity: number,
    loanAmount: number,
    annualRate: number,
  ): number {
    const monthlyRate = annualRate / 12;
    const calculatedTerm =
      Math.log(debtCapacity / (debtCapacity - loanAmount * monthlyRate)) /
      Math.log(1 + monthlyRate);
    const availableTerms = [12, 24, 36, 48, 60];
    return (
      availableTerms.reverse().find((term) => term <= calculatedTerm) ||
      availableTerms[0]
    );
  }
}
