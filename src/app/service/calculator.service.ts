import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  calculatePrice(loanAmount: number, interestRate: number, months: number) {
    const monthlyRate = interestRate / 12 / 100;
    const factor = Math.pow(1 + monthlyRate, months);
    const monthlyInstallment =
      (loanAmount * monthlyRate * factor) / (factor - 1);
    const totalPaid = monthlyInstallment * months;

    return { monthlyInstallment, totalPaid };
  }

  calculateSAC(loanAmount: number, interestRate: number, months: number) {
    const monthlyPrincipal = loanAmount / months;
    const installments = Array.from({ length: months }, (_, i) => {
      const balance = loanAmount - i * monthlyPrincipal;
      const interest = balance * (interestRate / 12 / 100);
      return monthlyPrincipal + interest;
    });

    const totalPaid = installments.reduce((sum, value) => sum + value, 0);

    return { monthlyInstallment: installments, totalPaid };
  }
  constructor() {}
}
