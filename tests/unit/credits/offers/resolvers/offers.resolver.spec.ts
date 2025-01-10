import { Test, TestingModule } from '@nestjs/testing';
import { OffersResolver } from '../../../../../credits/offers/resolvers/offers.resolver';
import { OffersService } from '../../../../../credits/offers/services/offers.service';

describe('OffersResolver', () => {
  let resolver: OffersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OffersResolver, OffersService],
    }).compile();

    resolver = module.get<OffersResolver>(OffersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
