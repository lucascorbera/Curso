import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado, Municipio } from '../Models/brasil-api-models/brasil-api-models-module';

@Injectable({
    providedIn: 'root',
})
export class BrasilApiService {
    urlBase = 'https://brasilapi.com.br/api';

    constructor(private http: HttpClient) {}

    listarUFs(): Observable<Estado[]> {
        return this.http.get<Estado[]>(`${this.urlBase}/ibge/uf/v1`);
    }

    listarMunicipios(uf: string): Observable<Municipio[]> {
        return this.http.get<Municipio[]>(`${this.urlBase}/ibge/municipios/v1/${uf}`);
    }

    buscarEnderecoPorCep(cep: string): Observable<any> {
        return this.http.get<any>(`${this.urlBase}/cep/v2/${cep}`);
    }
}
