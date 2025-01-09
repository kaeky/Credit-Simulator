import { Resolver } from '@nestjs/graphql';
import { InterestRateService } from '../services/interest-rate.service';

@Resolver()
export class InterestRateResolver {
  constructor(private readonly interestRateService: InterestRateService) {}

  public async getInterestRates() {}

  public async saveInterestRate() {}

  public async updateInterestRate() {}
}
