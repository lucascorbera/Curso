import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JiraService, PersonPoints } from '../../services/jira-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseChartDirective  } from 'ng2-charts';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);


@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    BaseChartDirective
],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})


export class Home implements OnInit {
  loading = true;
  totalProjetos = 0;
  chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Projetos por Área' }]
  };
  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Distribuição de Projetos por Área' }
    }
  };

  constructor(private jiraService: JiraService) {}

  ngOnInit() {
    this.jiraService.getProjectsByArea().subscribe(data => {
      this.chartData.labels = data.map(d => d.area);
      this.chartData.datasets[0].data = data.map(d => d.quantidade);
      this.totalProjetos = data.reduce((sum, d) => sum + d.quantidade, 0);
      this.loading = false;
    });
  }
}
