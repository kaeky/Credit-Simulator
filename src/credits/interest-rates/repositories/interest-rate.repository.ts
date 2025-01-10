import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InterestRateEntity } from '../entities/interest-rate.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreditRiskProfileEnum } from '../../risk-profile/types/risk-profile.type';

@Injectable()
export class InterestRateRepository {
  constructor(
    @InjectRepository(InterestRateEntity)
    private readonly interestRatesRepository: Repository<InterestRateEntity>,
  ) {}
  public find = this.interestRatesRepository.find.bind(
    this.interestRatesRepository,
  );

  public save = this.interestRatesRepository.save.bind(
    this.interestRatesRepository,
  );

  public calculateInterestRate(
    amount: number,
    riskProfile: CreditRiskProfileEnum,
  ) {
    return this.interestRatesRepository.findOne({
      where: {
        riskProfile,
        minRange: LessThanOrEqual(amount),
        maxRange: MoreThanOrEqual(amount),
      },
    });
  }

  public basicInterestRate(riskProfile: CreditRiskProfileEnum) {
    return this.interestRatesRepository.findOne({
      where: {
        riskProfile,
        minRange: 0,
      },
    });
  }
}
