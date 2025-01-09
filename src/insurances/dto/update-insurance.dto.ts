import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateInsuranceDto } from './create-insurance.dto';

@InputType()
export class UpdateInsuranceDto extends PartialType(CreateInsuranceDto) {
  @Field()
  public id: number;
}
