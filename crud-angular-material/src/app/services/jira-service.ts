import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { AuthService } from './auth-service';

export interface PersonPoints {
    accountId: string;
    displayName: string;
    avatar?: string;
    points: number;
    completedPoints?: number;
}

@Injectable({
    providedIn: 'root',
})
export class JiraService {
    url_base = 'https://tecbantv.atlassian.net/rest/api/3';
    constructor(private http: HttpClient, private auth: AuthService) {}

    // já existe esse aqui
    getPointsSummaryByReporter(jql: string): Observable<PersonPoints[]> {
        const body = {
            fields: ['customfield_10042', 'assignee'],
            jql,
            maxResults: 5000,
        };
        return this.http
            .post<any>('http://localhost:3000/jira/search', body)
            .pipe(map((res) => this.mapIssuesToPoints(res?.issues || [])));
    }

    // novo método para buscar concluídos
    getCompletedPointsByReporter(jql: string): Observable<PersonPoints[]> {
        const body = {
            fields: ['customfield_10042', 'assignee'],
            jql,
            maxResults: 5000,
        };
        return this.http
            .post<any>('http://localhost:3000/jira/search', body)
            .pipe(map((res) => this.mapIssuesToPoints(res?.issues || [])));
    }

    // função auxiliar para não repetir código
    private mapIssuesToPoints(issues: any[]): PersonPoints[] {
        const map = new Map<string, PersonPoints>();

        for (const issue of issues) {
            const points = Number(issue?.fields?.customfield_10042) || 0;
            const assignee = issue?.fields?.assignee;
            const accountId = assignee?.accountId ?? 'unknown';
            const displayName = assignee?.displayName ?? 'Unknown';
            const avatar = assignee?.avatarUrls?.['48x48'] ?? assignee?.avatarUrls?.['32x32'] ?? '';

            if (map.has(accountId)) {
                map.get(accountId)!.points += points;
            } else {
                map.set(accountId, { accountId, displayName, avatar, points });
            }
        }

        return Array.from(map.values()).sort((a, b) => b.points - a.points);
    }
}
