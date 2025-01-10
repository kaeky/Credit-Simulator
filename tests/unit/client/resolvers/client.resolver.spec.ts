import { Test, TestingModule } from '@nestjs/testing';
import { ClientResolver } from '../../../../client/resolvers/client.resolver';
import { ClientService } from '../../../../client/services/client.service';

describe('ClientResolver', () => {
  let resolver: ClientResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientResolver, ClientService],
    }).compile();

    resolver = module.get<ClientResolver>(ClientResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
