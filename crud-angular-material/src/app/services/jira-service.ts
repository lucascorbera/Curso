import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, forkJoin, map, of ,switchMap} from 'rxjs';
import { environment } from '../../environments/environment';

export interface PersonPoints {
    accountId: string;
    displayName: string;
    avatar: string;
    plannedPoints: number;
    completedPoints: number;
    QuantidadeissuesTotal?: number;
    QuantidadeissuesPendentes?: number;
    QuantidadeissuesConcluidos?: number;
}

export interface QuantidadePRojetosArea{
    area: string;
    quantidade: number;
    status: string;
}

@Injectable({ providedIn: 'root' })
export class JiraService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getTodosProjetosEmBackLog(jqlConsulta: string): Observable<any[]> {
        const maxResults = 50; // Ajuste conforme necessário
        let todasIssues: any[] = [];

        // Função recursiva para buscar todas as páginas do Jira
        const carregarPaginas = (nextPageToken?: string): Observable<void> => {
            const body: any = {
            jql: jqlConsulta,
            fields: ['status', 'customfield_10042', 'assignee', 'reporter', 'issuetype', 'summary'],
            maxResults
            };

            if (nextPageToken) {
            body.nextPageToken = nextPageToken;
            }

            return this.http.post<any>(`${this.baseUrl}?endpoint=search/jql`, body).pipe(
            switchMap(result => {
                const issues = result.issues || [];
                todasIssues = [...todasIssues, ...issues]; // acumula todas as issues

                if (result.nextPageToken) {
                // Continua buscando até acabar as páginas
                return carregarPaginas(result.nextPageToken);
                } else {
                return of(void 0); // última página, finaliza
                }
            })
            );
        };

        // Após buscar todas as páginas, retorna o array completo de issues
        return carregarPaginas().pipe(
            map(() => todasIssues),
            catchError(error => {
            console.error('Erro ao carregar dados do Jira:', error);
            return of([]);
            })
        );
    }


    /**
     * Retorna pontos planejados e concluídos por reporter
     */
    getPointsSummaryByReporter(
        jqlPlanned: string,
        jqlCompleted: string
    ): Observable<PersonPoints[]> {
        // chamadas para pontos planejados e concluídos
        const planned$ = this.http.post<any>(`${this.baseUrl}?endpoint=search/jql`, {
            fields: ['status', 'customfield_10042', 'assignee'],
            jql: jqlPlanned,
            maxResults: 5000,
        });

        const completed$ = this.http.post<any>(`${this.baseUrl}?endpoint=search/jql`, {
            fields: ['status', 'customfield_10042', 'assignee'],
            jql: jqlCompleted,
            maxResults: 5000,
        });

        return forkJoin([planned$, completed$]).pipe(
            map(([plannedRes, completedRes]) => {
                const meuMapaJuntaRetorno = new Map<string, PersonPoints>();

                const process = (issues: any[], key: 'plannedPoints' | 'completedPoints') => {
                    for (const issue of issues) {
                        const points = Number(issue?.fields?.customfield_10042) || 0;
                        const assignee = issue?.fields?.assignee;
                        const accountId = assignee?.accountId ?? 'unknown';
                        const displayName = assignee?.displayName ?? 'Unknown';
                        const avatar =
                            assignee?.avatarUrls?.['48x48'] ??
                            assignee?.avatarUrls?.['32x32'] ??
                            '';

                        if (meuMapaJuntaRetorno.has(accountId)) {
                            meuMapaJuntaRetorno.get(accountId)![key] += points;

                            if (key === 'plannedPoints') {
                                // Sempre soma total
                                meuMapaJuntaRetorno.get(accountId)!.QuantidadeissuesTotal =
                                    (meuMapaJuntaRetorno.get(accountId)!.QuantidadeissuesTotal ||
                                        0) + 1;

                                // Verifica status
                                if (issue?.fields?.status?.name === 'DONE') {
                                    meuMapaJuntaRetorno.get(accountId)!.QuantidadeissuesConcluidos =
                                        (meuMapaJuntaRetorno.get(accountId)!
                                            .QuantidadeissuesConcluidos || 0) + 1;
                                } else {
                                    meuMapaJuntaRetorno.get(accountId)!.QuantidadeissuesPendentes =
                                        (meuMapaJuntaRetorno.get(accountId)!
                                            .QuantidadeissuesPendentes || 0) + 1;
                                }
                            }
                        } else {
                            // Inicializa corretamente os contadores
                            let total = 0;
                            let concluidos = 0;
                            let pendentes = 0;

                            if (key === 'plannedPoints') {
                                total = 1;
                                if (issue?.fields?.status?.name === 'DONE') {
                                    concluidos = 1;
                                } else {
                                    pendentes = 1;
                                }
                            }

                            meuMapaJuntaRetorno.set(accountId, {
                                accountId,
                                displayName,
                                avatar,
                                plannedPoints: key === 'plannedPoints' ? points : 0,
                                completedPoints: key === 'completedPoints' ? points : 0,
                                QuantidadeissuesTotal: total,
                                QuantidadeissuesPendentes: pendentes,
                                QuantidadeissuesConcluidos: concluidos,
                            });
                        }
                    }
                };

                process(plannedRes?.issues || [], 'plannedPoints');
                process(completedRes?.issues || [], 'completedPoints');

                return Array.from(meuMapaJuntaRetorno.values()).sort(
                    (a, b) => b.plannedPoints - a.plannedPoints
                );
            })
        );
    }
}
