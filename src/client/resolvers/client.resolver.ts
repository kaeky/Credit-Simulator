import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientService } from '../services/client.service';
import { ClientEntity } from '../entities/client.entity';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';

@Resolver(() => ClientEntity)
export class ClientResolver {
  constructor(private readonly clientService: ClientService) {}

  @Query(() => [ClientEntity])
  public async getClients(): Promise<ClientEntity[]> {
    return this.clientService.getClients();
  }

  @Mutation(() => ClientEntity)
  public async saveClient(
    @Args('input') input: CreateClientDto,
  ): Promise<ClientEntity> {
    return this.clientService.createClient(input);
  }

  @Mutation(() => ClientEntity)
  public async updateClient(
    @Args('input') input: UpdateClientDto,
  ): Promise<ClientEntity> {
    return this.clientService.updateClient(input);
  }
}
