import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JiraService, type QuantidadePRojetosArea } from '../../services/jira-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { MatProgressBar } from '@angular/material/progress-bar';
// 🔹 Importa o plugin para mostrar rótulos (quantidades)
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels); // 🔹 registra o plugin

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        MatCardModule,
        MatProgressSpinnerModule,
        BaseChartDirective,
        MatProgressBar,
    ],
    templateUrl: './home.html',
    styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
    loading = true;
    error: string | null = null;
    totalProjetos = 0;

    chartData: ChartConfiguration<'bar'>['data'] = {
        labels: [],
        datasets: [{ data: [], label: 'Projetos por Área', backgroundColor: [] }],
    };

    chartOptions: ChartConfiguration<'bar'>['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Distribuição de Projetos por Área' },
            datalabels: {
                anchor: 'end',
                align: 'top',
                color: '#000',
                font: { weight: 'bold' },
                formatter: (value: number) => value, // mostra o número acima da barra
            },
        },
        scales: {
            x: { ticks: { font: { size: 12 } } },
            y: { beginAtZero: true, ticks: { stepSize: 1 } },
        },
    };

    constructor(private jiraService: JiraService) {}

    ngOnInit(): void {
        this.carregaProjetosJira(
            `project = "Backlog Geral" and status IN ("To Do", DOING, WAITING, done) ORDER BY created DESC`
        );
    }

    carregaProjetosJira(jqlProjetosBackLog: string): void {
        this.loading = true;
        this.error = null;

        this.jiraService.getTodosProjetosEmBackLog(jqlProjetosBackLog).subscribe({
            next: (dados) => {
                console.log('Dados recebidos do Jira:', dados);

                const meuMapaTodosProjetos = new Map<string, QuantidadePRojetosArea>();

                // 🔹 Agrupa os projetos por área
                for (const issue of dados) {
                    const area = issue?.fields?.issuetype?.name ?? 'Unknown';
                    const status = issue?.fields?.status?.name ?? 'Unknown';

                    if (meuMapaTodosProjetos.has(area)) {
                        meuMapaTodosProjetos.get(area)!.quantidade += 1;
                    } else {
                        meuMapaTodosProjetos.set(area, { area, quantidade: 1, status });
                    }
                }

                // 🔹 Converte o Map em array
                const listaProjetos = Array.from(meuMapaTodosProjetos.values());

                // 🔹 Ordena do maior para o menor
                listaProjetos.sort((a, b) => b.quantidade - a.quantidade);

                // 🔹 Define cores: o maior ganha destaque
                const backgroundColors = listaProjetos.map((_, index) =>
                    index === 1 ? '#1565C0' : '#64B5F6'
                );

                // 🔹 Alimenta o gráfico
                this.chartData = {
                    labels: listaProjetos.map((d) => d.area),
                    datasets: [
                        {
                            label: 'Projetos por Área',
                            data: listaProjetos.map((d) => d.quantidade),
                            backgroundColor: backgroundColors,
                            borderRadius: 6,
                        },
                    ],
                };

                // 🔹 Calcula o total geral
                this.totalProjetos = listaProjetos.reduce((sum, d) => sum + d.quantidade, 0);

                this.loading = false;
            },
            error: (erro) => {
                this.error = 'Erro ao carregar os dados do Jira';
                this.loading = false;
                console.error('Erro ao carregar dados do Jira:', erro);
            },
        });
    }
}
