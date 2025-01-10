import { CreateOfferDto } from './create-offer.dto';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOfferDto extends PartialType(CreateOfferDto) {
  @Field()
  id: number;
}
