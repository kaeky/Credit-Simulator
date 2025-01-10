import { InterestRateService } from '../../../../../src/credits/interest-rates/services/interest-rate.service';
import { InterestRateRepository } from '../../../../../src/credits/interest-rates/repositories/interest-rate.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { InterestRateEntity } from '../../../../../src/credits/interest-rates/entities/interest-rate.entity';
import { CreditRiskProfileEnum } from '../../../../../src/credits/risk-profile/types/risk-profile.type';
import { CreateInterestRateDto } from '../../../../../src/credits/interest-rates/dto/create-interest-rate.dto';
import { UpdateInterestRateDto } from '../../../../../src/credits/interest-rates/dto/update-interest-rate.dto';

describe('InterestRateService', () => {
  let service: InterestRateService;
  let mockInterestRateRepository: InterestRateRepository;

  beforeEach(async () => {
    // Creando un mock del repositorio
    mockInterestRateRepository = {
      find: jest.fn(),
      save: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InterestRateService,
        {
          provide: InterestRateRepository,
          useValue: mockInterestRateRepository,
        },
      ],
    }).compile();

    service = module.get<InterestRateService>(InterestRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getInterestRates', () => {
    it('should return an array of interest rates', async () => {
      const result: InterestRateEntity[] = [
        {
          id: 1,
          riskProfile: CreditRiskProfileEnum.AA,
          minRange: 0,
          maxRange: 6999999,
          rate: 0.2345,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          riskProfile: CreditRiskProfileEnum.AA,
          minRange: 0,
          maxRange: 8,
          rate: 0.2345,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockInterestRateRepository.find.mockResolvedValue(result);

      expect(await service.getInterestRates()).toBe(result);
    });
  });

  describe('saveInterestRate', () => {
    it('should save a new interest rate and return it', async () => {
      const createInterestRateDto: CreateInterestRateDto = {
        riskProfile: CreditRiskProfileEnum.AA,
        minRange: 0,
        maxRange: 6999999,
        rate: 0.2345,
      };
      const savedInterestRate: InterestRateEntity = {
        id: 1,
        ...createInterestRateDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockInterestRateRepository.save.mockResolvedValue(savedInterestRate);

      expect(await service.saveInterestRate(createInterestRateDto)).toBe(
        savedInterestRate,
      );
    });
  });

  describe('updateInterestRate', () => {
    it('should update an interest rate and return it', async () => {
      const updateInterestRateDto: UpdateInterestRateDto = {
        id: 1,
        rate: 0.08,
      };
      const updatedInterestRate: InterestRateEntity = {
        id: 1,
        riskProfile: CreditRiskProfileEnum.AA,
        minRange: 0,
        maxRange: 6999999,
        rate: 0.8,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockInterestRateRepository.save.mockResolvedValue(updatedInterestRate);

      expect(await service.updateInterestRate(updateInterestRateDto)).toBe(
        updatedInterestRate,
      );
    });
  });
});
