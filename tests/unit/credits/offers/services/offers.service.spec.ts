import { OffersService } from '../../../../../src/credits/offers/services/offers.service';
import { OfferRepository } from '../../../../../src/credits/offers/repositories/offer.repository';
import { ClientService } from '../../../../../src/client/services/client.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateOfferDto } from '../../../../../src/credits/offers/dto/create-offer.dto';
import { UpdateOfferDto } from '../../../../../src/credits/offers/dto/update-offer.dto';
import { GENERATE_OFFER } from '../../../../../src/credits/offers/constants/offer.constant';
import { CreditRiskProfileEnum } from '../../../../../src/credits/risk-profile/types/risk-profile.type';
import { CreditStatusEnum } from '../../../../../src/credits/offers/types/credit-status.type';

describe('OffersService', () => {
  let service: OffersService;
  let offerRepository: jest.Mocked<OfferRepository>;
  let clientService: jest.Mocked<ClientService>;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OffersService,
        {
          provide: OfferRepository,
          useValue: {
            find: jest.fn(),
            getOfferByClient: jest.fn(),
            saveOffer: jest.fn(),
            updateOffer: jest.fn(),
          },
        },
        {
          provide: ClientService,
          useValue: {
            getClientById: jest.fn(),
          },
        },
        EventEmitter2,
      ],
    }).compile();

    service = module.get<OffersService>(OffersService);
    offerRepository = module.get(OfferRepository);
    clientService = module.get(ClientService);
    eventEmitter = module.get(EventEmitter2);
  });

  describe('getAllOffers', () => {
    it('should call find on offerRepository and return the result', async () => {
      // Arrange
      const offers = [{ id: 1, name: 'Offer1' }];
      offerRepository.find.mockResolvedValue(offers);

      // Act
      const result = await service.getAllOffers();

      // Assert
      expect(offerRepository.find).toHaveBeenCalled();
      expect(result).toEqual(offers);
    });
  });

  describe('getOfferByClientId', () => {
    it('should call getOfferByClient on offerRepository with the correct clientId', async () => {
      // Arrange
      const clientId = 1;
      const offers = [
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
      offerRepository.getOfferByClient.mockResolvedValue(offers);

      // Act
      const result = await service.getOfferByClientId(clientId);

      // Assert
      expect(offerRepository.getOfferByClient).toHaveBeenCalledWith(clientId);
      expect(result).toEqual(offers);
    });
  });

  describe('saveOffer', () => {
    it('should call getClientById on clientService and saveOffer on offerRepository', async () => {
      // Arrange
      const createOfferDto: CreateOfferDto = {
        amount: 15904241,
        clientId: 1,
        status: CreditStatusEnum.ACTIVE,
        term: 48,
      };
      const client = {
        id: 1,
        name: 'Carlos A',
        lastName: 'Bautista',
        age: 30,
        riskProfile: CreditRiskProfileEnum.AA,
        borrowingCapacity: 1000000,
        createdAt: new Date('2021-09-01T00:00:00.000Z'),
        updatedAt: new Date('2021-09-01T00:00:00.000Z'),
      };
      const savedOffer = {
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
      clientService.getClientById.mockResolvedValue(client);
      offerRepository.saveOffer.mockResolvedValue(savedOffer);

      // Act
      const result = await service.saveOffer(createOfferDto);

      // Assert
      expect(clientService.getClientById).toHaveBeenCalledWith(
        createOfferDto.clientId,
      );
      expect(offerRepository.saveOffer).toHaveBeenCalledWith(
        createOfferDto,
        client,
      );
      expect(result).toEqual(savedOffer);
    });
  });

  describe('updateOffer', () => {
    it('should call updateOffer on offerRepository with the correct offer data', async () => {
      // Arrange
      const updateOfferDto: UpdateOfferDto = { id: 1266, amount: 1 };
      const updatedOffer = {
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
      offerRepository.updateOffer.mockResolvedValue(updatedOffer);

      // Act
      const result = await service.updateOffer(updateOfferDto);

      // Assert
      expect(offerRepository.updateOffer).toHaveBeenCalledWith(updateOfferDto);
      expect(result).toEqual(updatedOffer);
    });
  });

  describe('Event Listener for GENERATE_OFFER', () => {
    it('should listen for GENERATE_OFFER and call saveOffer', async () => {
      // Arrange
      const createOfferDto: CreateOfferDto = {
        amount: 15904241,
        clientId: 1,
        status: CreditStatusEnum.ACTIVE,
        term: 48,
      };
      const client = {
        id: 1,
        name: 'Carlos A',
        lastName: 'Bautista',
        age: 30,
        riskProfile: CreditRiskProfileEnum.AA,
        borrowingCapacity: 1000000,
        createdAt: new Date('2021-09-01T00:00:00.000Z'),
        updatedAt: new Date('2021-09-01T00:00:00.000Z'),
      };
      const savedOffer = {
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
      clientService.getClientById.mockResolvedValue(client);
      offerRepository.saveOffer.mockResolvedValue(savedOffer);

      // Act
      eventEmitter.on(GENERATE_OFFER, service.saveOffer.bind(service));

      await eventEmitter.emitAsync(GENERATE_OFFER, createOfferDto);

      // Assert
      expect(clientService.getClientById).toHaveBeenCalledWith(
        createOfferDto.clientId,
      );
      expect(offerRepository.saveOffer).toHaveBeenCalledWith(
        createOfferDto,
        client,
      );
    });
  });
});
