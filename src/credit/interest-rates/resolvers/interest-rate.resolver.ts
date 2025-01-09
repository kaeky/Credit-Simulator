import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InterestRateService } from '../services/interest-rate.service';
import { InterestRateEntity } from '../entities/interest-rate.entity';
import { CreateInterestRateDto } from '../dto/create-interest-rate.dto';
import { UpdateInterestRateDto } from '../dto/update-interest-rate.dto';

@Resolver()
export class InterestRateResolver {
  constructor(private readonly interestRateService: InterestRateService) {}

  @Query(() => [InterestRateEntity])
  public async getInterestRates(): Promise<InterestRateEntity[]> {
    return this.interestRateService.getInterestRates();
  }

  @Mutation(() => InterestRateEntity)
  public async saveInterestRate(
    @Args('input') input: CreateInterestRateDto,
  ): Promise<InterestRateEntity> {
    return this.interestRateService.saveInterestRate(input);
  }

  @Mutation(() => InterestRateEntity)
  public async updateInterestRate(@Args('input') input: UpdateInterestRateDto) {
    return this.interestRateService.updateInterestRate(input);
  }
}
