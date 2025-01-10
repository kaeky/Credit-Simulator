import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ClientValidationService {
  validateBorrowingCapacity(
    monthlyPayment: number,
    borrowingCapacity: number,
  ): void {
    if (monthlyPayment > borrowingCapacity) {
      throw new BadRequestException(
        'The monthly payment is higher than the borrowing capacity',
      );
    }
  }
}
