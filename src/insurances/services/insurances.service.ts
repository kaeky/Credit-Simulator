import { Injectable } from '@nestjs/common';
import { InsuranceRepository } from '../repositories/insurance.repository';
import { InsuranceEntity } from '../entities/insurance.entity';
import { CreateInsuranceDto } from '../dto/create-insurance.dto';
import { UpdateInsuranceDto } from '../dto/update-insurance.dto';

@Injectable()
export class InsurancesService {
  constructor(private readonly insuranceRepository: InsuranceRepository) {}

  getInsurances(): Promise<InsuranceEntity[]> {
    return this.insuranceRepository.find();
  }

  getInsuranceByAge(age: number): Promise<InsuranceEntity> {
    return this.insuranceRepository.getInsuranceByAge(age);
  }

  saveInsurance(insurance: CreateInsuranceDto): Promise<InsuranceEntity> {
    return this.insuranceRepository.save(insurance);
  }

  updateInsurance(insurance: UpdateInsuranceDto): Promise<InsuranceEntity> {
    return this.insuranceRepository.save(insurance);
  }
}
