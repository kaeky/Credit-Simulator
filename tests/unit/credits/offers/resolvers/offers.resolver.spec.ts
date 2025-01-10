import { OffersResolver } from '../../../../../src/credits/offers/resolvers/offers.resolver';
import { OffersService } from '../../../../../src/credits/offers/services/offers.service';
import { Test, TestingModule } from '@nestjs/testing';
import { OfferEntity } from '../../../../../src/credits/offers/entities/offer.entity';
import { CreditStatusEnum } from '../../../../../src/credits/offers/types/credit-status.type';
import { CreditRiskProfileEnum } from '../../../../../src/credits/risk-profile/types/risk-profile.type';
import { CreateOfferDto } from '../../../../../src/credits/offers/dto/create-offer.dto';
import { UpdateOfferDto } from '../../../../../src/credits/offers/dto/update-offer.dto';

describe('OffersResolver', () => {
  let resolver: OffersResolver;
  let service: jest.Mocked<OffersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OffersResolver,
        {
          provide: OffersService,
          useValue: {
            getAllOffers: jest.fn(),
            getOfferByClientId: jest.fn(),
            saveOffer: jest.fn(),
            updateOffer: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<OffersResolver>(OffersResolver);
    service = module.get<OffersService>(
      OffersService,
    ) as jest.Mocked<OffersService>;
  });

  describe('getAllOffers', () => {
    it('should call getAllOffers on the service and return the result', async () => {
      // Arrange
      const expectedOffers: OfferEntity[] = [
        {
          id: 1266,
          amount: 15904241,
          client: {
            id: 1,
            name: 'Carlos A',
            lastName: 'Bautista',
            age: 30,
            riskProfile: CreditRiskProfileEnum.AA,
            borrowingCapacity: 1000000,
            createdAt: new Date('2021-09-01T00:00:00.000Z'),
            updatedAt: new Date('2021-09-01T00:00:00.000Z'),
          },
          status: CreditStatusEnum.ACTIVE,
          term: 48,
          createdAt: new Date('2021-09-01T00:00:00.000Z'),
          updatedAt: new Date('2021-09-01T00:00:00.000Z'),
        },
      ];
      service.getAllOffers.mockResolvedValue(expectedOffers);

      // Act
      const result = await resolver.getAllOffers();

      // Assert
      expect(service.getAllOffers).toHaveBeenCalled();
      expect(result).toEqual(expectedOffers);
    });
  });

  describe('getOfferByClient', () => {
    it('should call getOfferByClientId on the service with the correct id', async () => {
      // Arrange
      const clientId = 1;
      const expectedOffers: OfferEntity[] = [
        {
          id: 1266,
          amount: 15904241,
          client: {
            id: 1,
            name: 'Carlos A',
            lastName: 'Bautista',
            age: 30,
            riskProfile: CreditRiskProfileEnum.AA,
            borrowingCapacity: 1000000,
            createdAt: new Date('2021-09-01T00:00:00.000Z'),
            updatedAt: new Date('2021-09-01T00:00:00.000Z'),
          },
          status: CreditStatusEnum.ACTIVE,
          term: 48,
          createdAt: new Date('2021-09-01T00:00:00.000Z'),
          updatedAt: new Date('2021-09-01T00:00:00.000Z'),
        },
      ];
      service.getOfferByClientId.mockResolvedValue(expectedOffers);

      // Act
      const result = await resolver.getOfferByClient(clientId);

      // Assert
      expect(service.getOfferByClientId).toHaveBeenCalledWith(clientId);
      expect(result).toEqual(expectedOffers);
    });
  });

  describe('saveOffer', () => {
    it('should call saveOffer on the service with the correct input', async () => {
      // Arrange
      const input: CreateOfferDto = {
        amount: 1001,
        clientId: 1,
        status: CreditStatusEnum.ACTIVE,
        term: 12,
      };
      const expectedOffer: OfferEntity = {
        id: 1266,
        amount: 15904241,
        client: {
          id: 1,
          name: 'Carlos A',
          lastName: 'Bautista',
          age: 30,
          riskProfile: CreditRiskProfileEnum.AA,
          borrowingCapacity: 1000000,
          createdAt: new Date('2021-09-01T00:00:00.000Z'),
          updatedAt: new Date('2021-09-01T00:00:00.000Z'),
        },
        status: CreditStatusEnum.ACTIVE,
        term: 48,
        createdAt: new Date('2021-09-01T00:00:00.000Z'),
        updatedAt: new Date('2021-09-01T00:00:00.000Z'),
      };
      service.saveOffer.mockResolvedValue(expectedOffer);

      // Act
      const result = await resolver.saveOffer(input);

      // Assert
      expect(service.saveOffer).toHaveBeenCalledWith(input);
      expect(result).toEqual(expectedOffer);
    });
  });

  describe('updateOffer', () => {
    it('should call updateOffer on the service with the correct input', async () => {
      // Arrange
      const input: UpdateOfferDto = { id: 1266, amount: 1 };
      const expectedOffer: OfferEntity = {
        id: 1266,
        amount: 1,
        client: {
          id: 1,
          name: 'Carlos A',
          lastName: 'Bautista',
          age: 30,
          riskProfile: CreditRiskProfileEnum.AA,
          borrowingCapacity: 1000000,
          createdAt: new Date('2021-09-01T00:00:00.000Z'),
          updatedAt: new Date('2021-09-01T00:00:00.000Z'),
        },
        status: CreditStatusEnum.ACTIVE,
        term: 48,
        createdAt: new Date('2021-09-01T00:00:00.000Z'),
        updatedAt: new Date('2021-09-01T00:00:00.000Z'),
      };
      service.updateOffer.mockResolvedValue(expectedOffer);

      // Act
      const result = await resolver.updateOffer(input);

      // Assert
      expect(service.updateOffer).toHaveBeenCalledWith(input);
      expect(result).toEqual(expectedOffer);
    });
  });
});
