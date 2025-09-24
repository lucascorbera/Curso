import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Cliente } from '../components/cadastro/Cliente';
@Injectable({
    providedIn: 'root',
})
export class ClienteApiService {
    url_base = 'http://localhost:3001';
    constructor(private http: HttpClient) {}

    InserirCliente(dadosCliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(`${this.url_base}/clientes`, dadosCliente);
    }
    AtualizarCliente(dadosCliente: Cliente): Observable<Cliente> {
        return this.http.put<Cliente>(`${this.url_base}/clientes/${dadosCliente.id}`, dadosCliente);
    }
}
