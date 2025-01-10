export interface InsuranceCalculationInterface {
  calculateInsuranceFee(monthlyPayment: number, percentage: number): number;
}
