import { Component, ViewEncapsulation } from '@angular/core';
import { CalculatorService } from '../../service/calculator.service';
import { Chart } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  loanAmount = 0;
  interestRate = 0;
  months = 0;
  calcType = 'price';
  result: any = null;

  constructor(private financeService: CalculatorService) {}

  calculate() {
    if (this.calcType === 'price') {
      this.result = this.financeService.calculatePrice(
        this.loanAmount,
        this.interestRate,
        this.months
      );
    } else if (this.calcType === 'sac') {
      this.result = this.financeService.calculateSAC(
        this.loanAmount,
        this.interestRate,
        this.months
      );
    }

    this.renderChart();
  }

  renderChart() {
    const chartElement = document.getElementById('chart') as HTMLCanvasElement;

    if (!chartElement) {
      console.error('Elemento do gráfico não encontrado');
      return;
    }

    const ctx = chartElement.getContext('2d');

    chartElement.width = window.innerWidth * 0.8;
    chartElement.height = 50;

    if (ctx) {
      if (this.calcType === 'price') {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: Array.from({ length: this.months }, (_, i) => i + 1),
            datasets: [
              {
                label: 'Parcelas Mensais (R$)',
                data: Array(this.months).fill(this.result.monthlyInstallment),
                borderColor: 'blue',
                fill: false,
              },
            ],
          },
        });
      } else {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: Array.from({ length: this.months }, (_, i) => i + 1),
            datasets: [
              {
                label: 'Parcelas Mensais (R$)',
                data: this.result.monthlyInstallments,
                borderColor: 'blue',
                fill: false,
              },
            ],
          },
        });
      }
    } else {
      console.error('Não foi possível obter o contexto do gráfico');
    }
  }
}
