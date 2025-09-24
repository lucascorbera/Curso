import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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
    DeletarCliente(id: string): Observable<void> {
        return this.http.delete<void>(`${this.url_base}/clientes/${id}`);
    }

    ListarClientes(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(`${this.url_base}/clientes`);
    }
    PesquisarClienteNome(nome: string): Observable<Cliente[]> {
        return this.http
            .get<Cliente[]>(`${this.url_base}/clientes`)
            .pipe(
                map((list) =>
                    list.filter((c) => (c.nome ?? '').toLowerCase().includes(nome.toLowerCase()))
                )
            );
    }
}
