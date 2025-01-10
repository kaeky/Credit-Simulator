import { InsurancesService } from '../../../../src/insurances/services/insurances.service';
import { InsuranceRepository } from '../../../../src/insurances/repositories/insurance.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { InsuranceEntity } from '../../../../src/insurances/entities/insurance.entity';
import { CreateInsuranceDto } from '../../../../src/insurances/dto/create-insurance.dto';
import { UpdateInsuranceDto } from '../../../../src/insurances/dto/update-insurance.dto';

describe('InsurancesService', () => {
  let service: InsurancesService;
  let repository: jest.Mocked<InsuranceRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InsurancesService,
        {
          provide: InsuranceRepository,
          useValue: {
            find: jest.fn(),
            getInsuranceByAge: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<InsurancesService>(InsurancesService);
    repository = module.get(InsuranceRepository);
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

      repository.find.mockResolvedValue(mockInsurances);

      const result = await service.getInsurances();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(mockInsurances);
    });
  });

  describe('getInsuranceByAge', () => {
    it('should return an insurance based on age', async () => {
      const mockInsurance: InsuranceEntity = {
        id: 1,
        minAge: 31,
        maxAge: 60,
        percentage: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const age = 35;

      repository.getInsuranceByAge.mockResolvedValue(mockInsurance);

      const result = await service.getInsuranceByAge(age);

      expect(repository.getInsuranceByAge).toHaveBeenCalledWith(age);
      expect(result).toEqual(mockInsurance);
    });
  });

  describe('saveInsurance', () => {
    it('should save a new insurance', async () => {
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

      repository.save.mockResolvedValue(mockInsurance);

      const result = await service.saveInsurance(input);

      expect(repository.save).toHaveBeenCalledWith(input);
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

      repository.save.mockResolvedValue(mockInsurance);

      const result = await service.updateInsurance(input);

      expect(repository.save).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockInsurance);
    });
  });
});
