import { CreateClientDto } from './create-client.dto';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateClientDto extends PartialType(CreateClientDto) {
  @Field()
  public id: number;
}
