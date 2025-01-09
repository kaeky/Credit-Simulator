import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InterestRateEntity } from '../entities/interest-rate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InterestRateRepository {
  constructor(
    @InjectRepository(InterestRateEntity)
    private readonly interestRatesRepository: Repository<InterestRateEntity>,
  ) {}
  public find = this.interestRatesRepository.find.bind(
    this.interestRatesRepository,
  );

  public save = this.interestRatesRepository.save.bind(
    this.interestRatesRepository,
  );
}
