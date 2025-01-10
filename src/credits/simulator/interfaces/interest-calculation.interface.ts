export interface InterestCalculationInterface {
  calculateMonthlyRate(rate: number, term: number): number;
  calculateMonthlyPayment(
    amount: number,
    monthlyRate: number,
    term: number,
  ): number;
}
