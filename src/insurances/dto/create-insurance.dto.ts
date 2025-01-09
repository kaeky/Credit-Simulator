import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateInsuranceDto {
  @Field()
  public minAge: number;

  @Field()
  public maxAge: number;

  @Field()
  public percentage: number;
}
