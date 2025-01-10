import { Injectable } from '@nestjs/common';
import { InsuranceCalculationInterface } from '../interfaces/insurance-calculation.interface';

@Injectable()
export class InsuranceCalculationService
  implements InsuranceCalculationInterface
{
  calculateInsuranceFee(monthlyPayment: number, percentage: number): number {
    return monthlyPayment * (percentage / 100);
  }
}
