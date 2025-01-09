import { Injectable } from '@nestjs/common';

@Injectable()
export class InterestRateService {
  getInterestRate(): number {
    return 0.1;
  }
}
