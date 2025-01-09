import { registerEnumType } from '@nestjs/graphql';

export enum CreditStatusEnum {
  ACTIVE = 'ACTIVO',
  INACTIVE = 'INACTIVO',
  WITHDRAWAL = 'DESEMBOLSADO',
}

registerEnumType(CreditStatusEnum, {
  name: 'CreditStatusEnum',
});
