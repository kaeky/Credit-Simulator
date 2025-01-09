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

  saveInsurance(insurance: CreateInsuranceDto): Promise<InsuranceEntity> {
    return this.insuranceRepository.save(insurance);
  }

  updateInsurance(insurance: UpdateInsuranceDto): Promise<InsuranceEntity> {
    return this.insuranceRepository.save(insurance);
  }
}
