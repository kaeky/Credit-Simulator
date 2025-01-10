import { CalculateInterestRateService } from '../../../../../src/credits/interest-rates/services/calculate-interest-rate.service';
import { InterestRateRepository } from '../../../../../src/credits/interest-rates/repositories/interest-rate.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CreditRiskProfileEnum } from '../../../../../src/credits/risk-profile/types/risk-profile.type';
import { InterestRateEntity } from '../../../../../src/credits/interest-rates/entities/interest-rate.entity';

describe('CalculateInterestRateService', () => {
  let service: CalculateInterestRateService;
  let repository: jest.Mocked<InterestRateRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalculateInterestRateService,
        {
          provide: InterestRateRepository,
          useValue: {
            calculateInterestRate: jest.fn(),
            basicInterestRate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CalculateInterestRateService>(
      CalculateInterestRateService,
    );
    repository = module.get<InterestRateRepository>(
      InterestRateRepository,
    ) as jest.Mocked<InterestRateRepository>;
  });

  describe('calculateInterestRate', () => {
    it('should call calculateInterestRate on the repository with correct parameters', async () => {
      // Arrange
      const amount = 10000;
      const riskProfile = CreditRiskProfileEnum.AA;
      const expectedResult = {
        id: 1,
        riskProfile: CreditRiskProfileEnum.AA,
        minRange: 0,
        maxRange: 6999999,
        rate: 0.2345,
      } as InterestRateEntity;
      repository.calculateInterestRate.mockResolvedValue(expectedResult);

      // Act
      const result = await service.calculateInterestRate(amount, riskProfile);

      // Assert
      expect(repository.calculateInterestRate).toHaveBeenCalledWith(
        amount,
        riskProfile,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('basicInterestRate', () => {
    it('should call basicInterestRate on the repository with correct parameters', async () => {
      // Arrange
      const riskProfile = CreditRiskProfileEnum.AA;
      const expectedResult = {
        id: 1,
        riskProfile: CreditRiskProfileEnum.AA,
        minRange: 0,
        maxRange: 6999999,
        rate: 0.2345,
      } as InterestRateEntity;
      repository.basicInterestRate.mockResolvedValue(expectedResult);

      // Act
      const result = await service.basicInterestRate(riskProfile);

      // Assert
      expect(repository.basicInterestRate).toHaveBeenCalledWith(riskProfile);
      expect(result).toEqual(expectedResult);
    });
  });
});
