import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

export interface PersonPoints {
    accountId: string;
    displayName: string;
    avatar: string;
    plannedPoints: number;
    completedPoints: number;
}

@Injectable({ providedIn: 'root' })
export class JiraService {
    private baseUrl = 'http://localhost:3000/jira';

    constructor(private http: HttpClient) {}

    /**
     * Retorna pontos planejados e concluídos por reporter
     */
    getPointsSummaryByReporter(
        jqlPlanned: string,
        jqlCompleted: string
    ): Observable<PersonPoints[]> {
        // chamadas para pontos planejados e concluídos
        const planned$ = this.http.post<any>(`${this.baseUrl}?endpoint=search/jql`, {
            fields: ['customfield_10042', 'assignee'],
            jql: jqlPlanned,
            maxResults: 5000,
        });

        const completed$ = this.http.post<any>(`${this.baseUrl}?endpoint=search/jql`, {
            fields: ['customfield_10042', 'assignee'],
            jql: jqlCompleted,
            maxResults: 5000,
        });
        console.log(planned$);
        console.log(completed$);
        return forkJoin([planned$, completed$]).pipe(
            map(([plannedRes, completedRes]) => {
                const map = new Map<string, PersonPoints>();

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

                        if (map.has(accountId)) {
                            map.get(accountId)![key] += points;
                        } else {
                            map.set(accountId, {
                                accountId,
                                displayName,
                                avatar,
                                plannedPoints: key === 'plannedPoints' ? points : 0,
                                completedPoints: key === 'completedPoints' ? points : 0,
                            });
                        }
                    }
                };

                process(plannedRes?.issues || [], 'plannedPoints');
                process(completedRes?.issues || [], 'completedPoints');

                return Array.from(map.values()).sort((a, b) => b.plannedPoints - a.plannedPoints);
            })
        );
    }
}
