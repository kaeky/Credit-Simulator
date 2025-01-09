import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InsurancesService } from './insurances.service';
import { Insurance } from './entities/insurance.entity';
import { CreateInsuranceInput } from './dto/create-insurance.input';
import { UpdateInsuranceInput } from './dto/update-insurance.input';

@Resolver(() => Insurance)
export class InsurancesResolver {
  constructor(private readonly insurancesService: InsurancesService) {}

  @Mutation(() => Insurance)
  createInsurance(@Args('createInsuranceInput') createInsuranceInput: CreateInsuranceInput) {
    return this.insurancesService.create(createInsuranceInput);
  }

  @Query(() => [Insurance], { name: 'insurances' })
  findAll() {
    return this.insurancesService.findAll();
  }

  @Query(() => Insurance, { name: 'insurance' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.insurancesService.findOne(id);
  }

  @Mutation(() => Insurance)
  updateInsurance(@Args('updateInsuranceInput') updateInsuranceInput: UpdateInsuranceInput) {
    return this.insurancesService.update(updateInsuranceInput.id, updateInsuranceInput);
  }

  @Mutation(() => Insurance)
  removeInsurance(@Args('id', { type: () => Int }) id: number) {
    return this.insurancesService.remove(id);
  }
}
