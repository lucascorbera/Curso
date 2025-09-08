import type { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Estado } from '../Models/brasil-api-models/brasil-api-models-module';

@Injectable({
    providedIn: 'root',
})
export class BrasilApiService {
    urlBase = 'https://brasilapi.com.br/api';

    constructor(private http: HttpClient) {}

    listarUFs(): Observable<Estado[]> {
        return this.http.get<Estado[]>(`${this.urlBase}/ibge/uf/v1`);
    }
}
