import { ClientService } from '../../../../src/client/services/client.service';
import { ClientRepository } from '../../../../src/client/repositories/client.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientEntity } from '../../../../src/client/entities/client.entity';
import { CreditRiskProfileEnum } from '../../../../src/credits/risk-profile/types/risk-profile.type';
import { CreateClientDto } from '../../../../src/client/dto/create-client.dto';
import { UpdateClientDto } from '../../../../src/client/dto/update-client.dto';

describe('ClientService', () => {
  let service: ClientService;
  let repository: jest.Mocked<ClientRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: ClientRepository,
          useValue: {
            find: jest.fn(),
            getClientById: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repository = module.get<ClientRepository>(
      ClientRepository,
    ) as jest.Mocked<ClientRepository>;
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
          riskProfile: CreditRiskProfileEnum.A,
        } as ClientEntity,
      ];
      repository.find.mockResolvedValue(clients);

      // Act
      const result = await service.getClients();

      // Assert
      expect(repository.find).toHaveBeenCalled();
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
        riskProfile: CreditRiskProfileEnum.A,
      } as ClientEntity;
      repository.getClientById.mockResolvedValue(client);

      // Act
      const result = await service.getClientById(1);

      // Assert
      expect(repository.getClientById).toHaveBeenCalledWith(1);
      expect(result).toEqual(client);
    });
  });

  describe('createClient', () => {
    it('should create a new client', async () => {
      // Arrange
      const input: CreateClientDto = {
        name: 'Carlos A',
        lastName: 'Bautista',
        age: 20,
        riskProfile: CreditRiskProfileEnum.A,
      };
      const createdClient: ClientEntity = { id: 2, ...input } as ClientEntity;
      repository.save.mockResolvedValue(createdClient);

      // Act
      const result = await service.createClient(input);

      // Assert
      expect(repository.save).toHaveBeenCalledWith(input);
      expect(result).toEqual(createdClient);
    });
  });

  describe('updateClient', () => {
    it('should update an existing client', async () => {
      // Arrange
      const input: UpdateClientDto = {
        id: 1,
        name: 'Carlos A',
        lastName: 'Bautista',
        age: 20,
        riskProfile: CreditRiskProfileEnum.A,
      };
      const updatedClient: ClientEntity = { id: 1, ...input } as ClientEntity;
      repository.save.mockResolvedValue(updatedClient);

      // Act
      const result = await service.updateClient(input);

      // Assert
      expect(repository.save).toHaveBeenCalledWith(input);
      expect(result).toEqual(updatedClient);
    });
  });
});
