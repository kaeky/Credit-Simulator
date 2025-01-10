export interface OptimalLoanCalculationInterface {
  calculateOptimalLoanAmount(
    debtCapacity: number,
    annualRate: number,
    termMonths: number,
    insurance: number,
  ): number;
  calculateOptimalTerm(
    debtCapacity: number,
    loanAmount: number,
    annualRate: number,
  ): number;
}
