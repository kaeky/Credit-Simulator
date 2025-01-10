import { InterestRateResolver } from '../../../../../src/credits/interest-rates/resolvers/interest-rate.resolver';
import { InterestRateService } from '../../../../../src/credits/interest-rates/services/interest-rate.service';
import { Test, TestingModule } from '@nestjs/testing';
import { InterestRateEntity } from '../../../../../src/credits/interest-rates/entities/interest-rate.entity';
import { CreditRiskProfileEnum } from '../../../../../src/credits/risk-profile/types/risk-profile.type';
import { CreateInterestRateDto } from '../../../../../src/credits/interest-rates/dto/create-interest-rate.dto';
import { UpdateInterestRateDto } from '../../../../../src/credits/interest-rates/dto/update-interest-rate.dto';

describe('InterestRateResolver', () => {
  let resolver: InterestRateResolver;
  let service: jest.Mocked<InterestRateService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InterestRateResolver,
        {
          provide: InterestRateService,
          useValue: {
            getInterestRates: jest.fn(),
            saveInterestRate: jest.fn(),
            updateInterestRate: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<InterestRateResolver>(InterestRateResolver);
    service = module.get<InterestRateService>(
      InterestRateService,
    ) as jest.Mocked<InterestRateService>;
  });

  describe('getInterestRates', () => {
    it('should return a list of interest rates', async () => {
      // Arrange
      const rates: InterestRateEntity[] = [
        {
          riskProfile: CreditRiskProfileEnum.AA,
          minRange: 0,
          maxRange: 6999999,
          rate: 0.2345,
        } as InterestRateEntity,
      ];
      service.getInterestRates.mockResolvedValue(rates);

      // Act
      const result = await resolver.getInterestRates();

      // Assert
      expect(service.getInterestRates).toHaveBeenCalled();
      expect(result).toEqual(rates);
    });
  });

  describe('saveInterestRate', () => {
    it('should save a new interest rate', async () => {
      // Arrange
      const input: CreateInterestRateDto = {
        riskProfile: CreditRiskProfileEnum.AA,
        minRange: 0,
        maxRange: 6999999,
        rate: 0.2345,
      };
      const savedRate: InterestRateEntity = {
        id: 2,
        ...input,
      } as InterestRateEntity;
      service.saveInterestRate.mockResolvedValue(savedRate);

      // Act
      const result = await resolver.saveInterestRate(input);

      // Assert
      expect(service.saveInterestRate).toHaveBeenCalledWith(input);
      expect(result).toEqual(savedRate);
    });
  });

  describe('updateInterestRate', () => {
    it('should update an existing interest rate', async () => {
      // Arrange
      const input: UpdateInterestRateDto = {
        id: 2,
        riskProfile: CreditRiskProfileEnum.AA,
        minRange: 0,
        maxRange: 13213131,
        rate: 0.2345,
      };
      const updatedRate: InterestRateEntity = {
        id: 1,
        ...input,
      } as InterestRateEntity;
      service.updateInterestRate.mockResolvedValue(updatedRate);

      // Act
      const result = await resolver.updateInterestRate(input);

      // Assert
      expect(service.updateInterestRate).toHaveBeenCalledWith(input);
      expect(result).toEqual(updatedRate);
    });
  });
});
