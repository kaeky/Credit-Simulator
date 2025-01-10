import { SimulationLogService } from '../../../../../src/credits/simulator/services/simulation-log.service';
import { SimulationRepository } from '../../../../../src/credits/simulator/repositories/simulation.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientEntity } from '../../../../../src/client/entities/client.entity';
import { CreateOfferDto } from '../../../../../src/credits/offers/dto/create-offer.dto';
import { CreditStatusEnum } from '../../../../../src/credits/offers/types/credit-status.type';

describe('SimulationLogServiceSpec', () => {
  let service: SimulationLogService;
  let repository: jest.Mocked<SimulationRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimulationLogService,
        {
          provide: SimulationRepository,
          useClass: jest.fn(() => ({
            find: jest.fn(),
            findClientSimulations: jest.fn(),
            save: jest.fn(),
            removeClientSimulations: jest.fn(),
          })),
        },
      ],
    }).compile();

    service = module.get<SimulationLogService>(SimulationLogService);
    repository = module.get(SimulationRepository);
  });

  describe('getSimulationLog', () => {
    it('should return simulation logs from the repository', async () => {
      // Arrange
      const mockLogs = [{ id: 1, client: {} as ClientEntity }];
      repository.find.mockResolvedValue(mockLogs);

      // Act
      const result = await service.getSimulationLog();

      // Assert
      expect(repository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockLogs);
    });
  });

  describe('saveLogSimulation', () => {
    it('should not save a log if client already has simulations', async () => {
      // Arrange
      const mockClient = { id: 1 } as ClientEntity;
      repository.findClientSimulations.mockResolvedValue({
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        client: mockClient,
      });

      // Act
      const result = await service.saveLogSimulation(mockClient);

      // Assert
      expect(repository.findClientSimulations).toHaveBeenCalledWith(mockClient);
      expect(repository.save).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('should save a log if no simulations exist for the client', async () => {
      // Arrange
      const mockClient = { id: 1 } as ClientEntity;
      repository.findClientSimulations.mockResolvedValue(null);
      const mockSavedLog = { id: 1, client: mockClient };
      repository.save.mockResolvedValue(mockSavedLog);

      // Act
      const result = await service.saveLogSimulation(mockClient);

      // Assert
      expect(repository.findClientSimulations).toHaveBeenCalledWith(mockClient);
      expect(repository.save).toHaveBeenCalledWith({ client: mockClient });
      expect(result).toEqual(mockSavedLog);
    });
  });

  describe('removeSimulationLog', () => {
    it('should call repository to remove client simulations', async () => {
      // Arrange
      const input: CreateOfferDto = {
        amount: 15904241,
        clientId: 1,
        status: CreditStatusEnum.ACTIVE,
        term: 48,
      };
      repository.removeClientSimulations.mockResolvedValue(true);

      // Act
      const result = await service.removeSimulationLog(input);

      // Assert
      expect(repository.removeClientSimulations).toHaveBeenCalledWith(
        input.clientId,
      );
      expect(result).toEqual(true);
    });
  });
});
