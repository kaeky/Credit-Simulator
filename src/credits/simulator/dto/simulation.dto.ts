import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class SimulationMonthDto {
  @Field()
  public month: number;
  @Field()
  public interest: number;
  @Field()
  public capital: number;
  @Field()
  public insurance: number;
  @Field()
  public balance: number;
  @Field()
  public paid: number;
}

@ObjectType()
export class SimulationCreditDto {
  @Field()
  public balance: number;
  @Field()
  public interest: number;
  @Field()
  public capital: number;
  @Field()
  public insurance: number;
  @Field(() => [SimulationMonthDto])
  public months: SimulationMonthDto[];
}
