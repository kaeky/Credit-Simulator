import { Injectable } from '@nestjs/common';
import { InterestRateEntity } from '../entities/interest-rate.entity';
import { InterestRateRepository } from '../repositories/interest-rate.repository';
import { CreateInterestRateDto } from '../dto/create-interest-rate.dto';
import { UpdateInterestRateDto } from '../dto/update-interest-rate.dto';

@Injectable()
export class InterestRateService {
  constructor(
    private readonly interestRateRepository: InterestRateRepository,
  ) {}
  getInterestRates(): Promise<InterestRateEntity[]> {
    return this.interestRateRepository.find();
  }
  saveInterestRate(
    interestRate: CreateInterestRateDto,
  ): Promise<InterestRateEntity> {
    return this.interestRateRepository.save(interestRate);
  }
  updateInterestRate(
    interestRate: UpdateInterestRateDto,
  ): Promise<InterestRateEntity> {
    return this.interestRateRepository.save(interestRate);
  }
}
