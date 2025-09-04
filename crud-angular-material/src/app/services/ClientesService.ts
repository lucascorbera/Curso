import { Injectable } from '@angular/core';
import { Cliente } from '../components/cadastro/Cliente';

@Injectable({
    providedIn: 'root',
})
export class ClientesService {
    pesquisarCliente(Nome: String): Cliente[] {
        if (Nome && Nome.trim().length > 0) {
            const clientes = this.obterClientes();
            return clientes.filter((c) => c.nome?.toLowerCase().includes(Nome.toLowerCase()));
        }
        return this.obterClientes();
    }

    salvar(cliente: Cliente) {
        // aqui eu estou pegando meu local storage
        cliente.gerarNovoId();
        const storage = this.obterClientes();
        //
        storage.push(cliente);
        localStorage.setItem(ClientesService.REPO_CLIENTE, JSON.stringify(storage));
    }

    static REPO_CLIENTE = '_CLIENTE';
    obterClientes(): Cliente[] {
        // aqui eu estou pegando meu local stotage paara verificar se ja tem algo salvo
        const repositorio_cliente_stoge = localStorage.getItem(ClientesService.REPO_CLIENTE);
        // aqui eu verifico se o repositorio existe
        if (repositorio_cliente_stoge) {
            const cliente: Cliente[] = JSON.parse(repositorio_cliente_stoge);
            return cliente;
        }

        // se o repositorio nao exsitir eu faço um set de um cliente fazio para criar o repositorio. agora
        const cliente: Cliente[] = [];
        localStorage.setItem(ClientesService.REPO_CLIENTE, JSON.stringify(cliente));
        return cliente;
    }

    getClienteById(id: string): Cliente {
        const clientes = this.obterClientes();
        const cliente = clientes.find((c) => c.id === id);
        return cliente ? cliente : Cliente.newCliente();
    }

    atualizar(cliente: Cliente) {
        const clientes = this.obterClientes();
        const index = clientes.findIndex((c) => c.id === cliente.id);
        if (index !== -1) {
            clientes[index] = cliente;
            localStorage.setItem(ClientesService.REPO_CLIENTE, JSON.stringify(clientes));
        }
    }
}
