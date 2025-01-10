import { InsurancesResolver } from '../../../../src/insurances/resolvers/insurances.resolver';
import { InsurancesService } from '../../../../src/insurances/services/insurances.service';
import { Test, TestingModule } from '@nestjs/testing';
import { InsuranceEntity } from '../../../../src/insurances/entities/insurance.entity';
import { CreateInsuranceDto } from '../../../../src/insurances/dto/create-insurance.dto';
import { UpdateInsuranceDto } from '../../../../src/insurances/dto/update-insurance.dto';

describe('InsurancesResolver', () => {
  let resolver: InsurancesResolver;
  let service: jest.Mocked<InsurancesService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InsurancesResolver,
        {
          provide: InsurancesService,
          useValue: {
            getInsurances: jest.fn(),
            saveInsurance: jest.fn(),
            updateInsurance: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<InsurancesResolver>(InsurancesResolver);
    service = module.get(InsurancesService);
  });

  describe('getInsurances', () => {
    it('should return a list of insurances', async () => {
      const mockInsurances: InsuranceEntity[] = [
        {
          id: 1,
          minAge: 19,
          maxAge: 30,
          percentage: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          minAge: 31,
          maxAge: 60,
          percentage: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      service.getInsurances.mockResolvedValue(mockInsurances);

      const result = await resolver.getInsurances();

      expect(service.getInsurances).toHaveBeenCalled();
      expect(result).toEqual(mockInsurances);
    });
  });

  describe('createInsurance', () => {
    it('should create a new insurance', async () => {
      const input: CreateInsuranceDto = {
        minAge: 4,
        maxAge: 8,
        percentage: 12.56,
      };

      const mockInsurance: InsuranceEntity = {
        id: 1,
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      service.saveInsurance.mockResolvedValue(mockInsurance);

      const result = await resolver.createInsurance(input);

      expect(service.saveInsurance).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockInsurance);
    });
  });

  describe('updateInsurance', () => {
    it('should update an existing insurance', async () => {
      const input: UpdateInsuranceDto = {
        id: 1,
        minAge: 4,
        maxAge: 8,
        percentage: 21,
      };

      const mockInsurance: InsuranceEntity = {
        id: 1,
        minAge: 4,
        maxAge: 8,
        percentage: 21,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      service.updateInsurance.mockResolvedValue(mockInsurance);

      const result = await resolver.updateInsurance(input);

      expect(service.updateInsurance).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockInsurance);
    });
  });
});
