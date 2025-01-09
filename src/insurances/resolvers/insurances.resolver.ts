import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { InsuranceEntity } from '../entities/insurance.entity';
import { InsurancesService } from '../services/insurances.service';
import { CreateInsuranceDto } from '../dto/create-insurance.dto';
import { UpdateInsuranceDto } from '../dto/update-insurance.dto';

@Resolver(() => InsuranceEntity)
export class InsurancesResolver {
  constructor(private readonly insurancesService: InsurancesService) {}

  @Query(() => [InsuranceEntity])
  getInsurances(): Promise<InsuranceEntity[]> {
    return this.insurancesService.getInsurances();
  }

  @Mutation(() => InsuranceEntity)
  createInsurance(
    @Args('input') input: CreateInsuranceDto,
  ): Promise<InsuranceEntity> {
    return this.insurancesService.saveInsurance(input);
  }

  @Mutation(() => InsuranceEntity)
  updateInsurance(
    @Args('input') input: UpdateInsuranceDto,
  ): Promise<InsuranceEntity> {
    return this.insurancesService.updateInsurance(input);
  }
}
