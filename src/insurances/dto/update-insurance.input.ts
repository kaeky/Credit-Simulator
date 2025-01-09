import { CreateInsuranceInput } from './create-insurance.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInsuranceInput extends PartialType(CreateInsuranceInput) {
  @Field(() => Int)
  id: number;
}
