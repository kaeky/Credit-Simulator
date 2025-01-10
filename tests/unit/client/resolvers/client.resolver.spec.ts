import { Test, TestingModule } from '@nestjs/testing';
import { ClientResolver } from '../../../../src/client/resolvers/client.resolver';
import { ClientService } from '../../../../src/client/services/client.service';
import { ClientEntity } from '../../../../src/client/entities/client.entity';
import { CreateClientDto } from '../../../../src/client/dto/create-client.dto';
import { UpdateClientDto } from '../../../../src/client/dto/update-client.dto';
import { CreditRiskProfileEnum } from '../../../../src/credits/risk-profile/types/risk-profile.type';

describe('ClientResolver', () => {
  let resolver: ClientResolver;
  let service: jest.Mocked<ClientService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientResolver,
        {
          provide: ClientService,
          useValue: {
            getClients: jest.fn(),
            getClientById: jest.fn(),
            createClient: jest.fn(),
            updateClient: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<ClientResolver>(ClientResolver);
    service = module.get<ClientService>(
      ClientService,
    ) as jest.Mocked<ClientService>;
  });

  describe('getClients', () => {
    it('should return a list of clients', async () => {
      // Arrange
      const clients: ClientEntity[] = [
        {
          id: 1,
          name: 'Carlos A',
          lastName: 'Bautista',
          age: 20,
          riskProfile: 'A',
        } as ClientEntity,
      ];
      service.getClients.mockResolvedValue(clients);

      // Act
      const result = await resolver.getClients();

      // Assert
      expect(service.getClients).toHaveBeenCalled();
      expect(result).toEqual(clients);
    });
  });

  describe('getClientById', () => {
    it('should return a client by id', async () => {
      // Arrange
      const client: ClientEntity = {
        id: 1,
        name: 'Carlos A',
        lastName: 'Bautista',
        age: 20,
        riskProfile: 'A',
      } as ClientEntity;
      service.getClientById.mockResolvedValue(client);

      // Act
      const result = await resolver.getClientById(1);

      // Assert
      expect(service.getClientById).toHaveBeenCalledWith(1);
      expect(result).toEqual(client);
    });
  });

  describe('saveClient', () => {
    it('should save a client and return the created client', async () => {
      // Arrange
      const input: CreateClientDto = {
        name: 'Carlos A',
        lastName: 'Bautista',
        age: 20,
        riskProfile: CreditRiskProfileEnum.A,
      };
      const createdClient: ClientEntity = { id: 2, ...input } as ClientEntity;
      service.createClient.mockResolvedValue(createdClient);

      // Act
      const result = await resolver.saveClient(input);

      // Assert
      expect(service.createClient).toHaveBeenCalledWith(input);
      expect(result).toEqual(createdClient);
    });
  });

  describe('updateClient', () => {
    it('should update a client and return the updated client', async () => {
      // Arrange
      const input: UpdateClientDto = {
        id: 1,
        name: 'Carlos A',
        lastName: 'Bautista',
        age: 20,
        riskProfile: CreditRiskProfileEnum.A,
      };
      const updatedClient: ClientEntity = { id: 1, ...input } as ClientEntity;
      service.updateClient.mockResolvedValue(updatedClient);

      // Act
      const result = await resolver.updateClient(input);

      // Assert
      expect(service.updateClient).toHaveBeenCalledWith(input);
      expect(result).toEqual(updatedClient);
    });
  });
});
