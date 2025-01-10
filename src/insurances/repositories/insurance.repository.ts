import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { InsuranceEntity } from '../entities/insurance.entity';

@Injectable()
export class InsuranceRepository {
  constructor(
    @InjectRepository(InsuranceEntity)
    private readonly insuranceEntityRepository: Repository<InsuranceEntity>,
  ) {}
  public find = this.insuranceEntityRepository.find.bind(
    this.insuranceEntityRepository,
  );

  public save = this.insuranceEntityRepository.save.bind(
    this.insuranceEntityRepository,
  );

  public getInsuranceByAge(age: number) {
    return this.insuranceEntityRepository.findOne({
      where: { minAge: LessThanOrEqual(age), maxAge: MoreThanOrEqual(age) },
    });
  }
}
