import { Injectable } from '@nestjs/common';
import { CreateInsuranceInput } from './dto/create-insurance.input';
import { UpdateInsuranceInput } from './dto/update-insurance.input';

@Injectable()
export class InsurancesService {
  create(createInsuranceInput: CreateInsuranceInput) {
    return 'This action adds a new insurance';
  }

  findAll() {
    return `This action returns all insurances`;
  }

  findOne(id: number) {
    return `This action returns a #${id} insurance`;
  }

  update(id: number, updateInsuranceInput: UpdateInsuranceInput) {
    return `This action updates a #${id} insurance`;
  }

  remove(id: number) {
    return `This action removes a #${id} insurance`;
  }
}
