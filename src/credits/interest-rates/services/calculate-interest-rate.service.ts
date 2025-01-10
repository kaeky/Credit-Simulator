import { Injectable } from '@nestjs/common';
import { CreditRiskProfileEnum } from '../../risk-profile/types/risk-profile.type';
import { InterestRateRepository } from '../repositories/interest-rate.repository';

@Injectable()
export class CalculateInterestRateService {
  constructor(
    private readonly interestRateRepository: InterestRateRepository,
  ) {}
  public calculateInterestRate(
    amount: number,
    riskProfile: CreditRiskProfileEnum,
  ) {
    return this.interestRateRepository.calculateInterestRate(
      amount,
      riskProfile,
    );
  }

  public basicInterestRate(riskProfile: CreditRiskProfileEnum) {
    return this.interestRateRepository.basicInterestRate(riskProfile);
  }
}
