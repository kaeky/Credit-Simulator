import { registerEnumType } from '@nestjs/graphql';

export enum CreditRiskProfileEnum {
  AAA = 'AAA',
  AA = 'AA',
  A = 'A',
  BAA = 'BAA',
}

registerEnumType(CreditRiskProfileEnum, {
  name: 'RiskProfileEnum',
});
