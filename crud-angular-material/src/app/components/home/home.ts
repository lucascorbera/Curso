import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JiraService } from '../../services/jira-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { MatProgressBar } from '@angular/material/progress-bar';
Chart.register(...registerables);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    BaseChartDirective,
    MatProgressBar
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'] // <-- estava styleUrl (corrigido)
})
export class Home implements OnInit {
  loading = true;
  error: string | null = null; // <-- adicionada para corrigir o erro
  totalProjetos = 0;

  chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Projetos por Área' }]
  };

  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Distribuição de Projetos por Área' }
    }
  };

  constructor(private jiraService: JiraService) {}

  ngOnInit(): void {
    this.carregaProjetosJira(`project = "Backlog Geral" and  status IN ("To Do",DOING,WAITING,done) ORDER BY created DESC`);
  }

  carregaProjetosJira(jqlProjetosBackLog: string): void {
    this.loading = true;
    this.error = null;

    // Primeiro, buscar os projetos no backlog
    this.jiraService.getTodosProjetosEmBackLog(jqlProjetosBackLog).subscribe({
        next: (dados) => {
            console.log("Json com todos meus projetos:", dados);
            this.chartData.labels = dados.map(d => d.area);
            this.chartData.datasets[0].data = dados.map(d => d.quantidade);
            this.totalProjetos = dados.reduce((sum, d) => sum + d.quantidade,0);
            this.loading = false;
        },
        error:(erro)=>{
            this.error = 'Erro ao carregar os dados do Jira';
            this.loading = false;
            console.error('Erro ao carregar dados do Jira:', erro);
        }
    })


  }
}
