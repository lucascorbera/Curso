import { Component } from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JiraService, PersonPoints } from '../../services/jira-service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { forkJoin } from 'rxjs';
@Component({
    selector: 'app-lista-pontos',
    imports: [
        MatProgressBarModule,
        MatInputModule,
        FlexLayoutModule,
        MatCardModule,
        MatIconModule,
        FormsModule,
        MatTableModule,
        MatButtonModule,
        CommonModule,
        MatPaginatorModule,
        MatSortModule,
    ],
    templateUrl: './lista-pontos.html',
    styleUrl: './lista-pontos.scss',
})
export class ListaPontos {
    displayedColumns: string[] = ['avatar', 'displayName', 'points', 'completedPoints'];
    dataSource = new MatTableDataSource<PersonPoints>([]);
    loading = false;
    error?: string;

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private jira: JiraService) {}
    ngOnInit(): void {
        // substitua a JQL pela sua
        const jql = ` issuetype = Atividades and project = 'Historias - Desenvolvimento'
      AND Sprint in (openSprints()) `;
        const jqlCompleted = ` issuetype = Atividades and project = 'Historias - Desenvolvimento'
      AND Sprint in (openSprints()) and status = Done`;
        this.load(jql, jqlCompleted);
    }

    load(jql: string, jqlCompleted: string) {
        this.loading = true;
        this.error = undefined;

        const jqlAll = jql;
        const jqlDone = jqlCompleted;

        forkJoin({
            all: this.jira.getPointsSummaryByReporter(jqlAll),
            done: this.jira.getCompletedPointsByReporter(jqlDone),
        }).subscribe({
            next: ({ all, done }) => {
                // mescla as duas listas
                console.log('All:', all);
                console.log('Done:', done);
                const merged = all.map((person) => {
                    const completed = done.find((d) => d.accountId === person.accountId);
                    return {
                        ...person,
                        completedPoints: completed?.points ?? 0,
                    };
                });

                this.dataSource.data = merged;

                setTimeout(() => {
                    this.dataSource.sort = this.sort;
                    this.dataSource.paginator = this.paginator;
                });

                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.error = 'Erro ao carregar dados do Jira';
                this.loading = false;
            },
        });
    }

    exportCsv() {
        const rows = this.dataSource.data;
        const header = ['Nome', 'Pontos'];
        const csv = [
            header.join(','),
            ...rows.map((r) => `"${r.displayName.replace(/"/g, '""')}",${r.points}`),
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `points-summary.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }
}
