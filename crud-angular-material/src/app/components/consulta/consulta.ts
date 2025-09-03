import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ClientesService } from '../../services/ClientesService';
import { Cliente } from '../cadastro/Cliente';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
@Component({
    selector: 'app-consulta',
    imports: [
        MatInputModule,
        FlexLayoutModule,
        MatCardModule,
        MatIconModule,
        FormsModule,
        MatTableModule,
        MatButtonModule,
        CommonModule,
        MatPaginatorModule,
    ],
    templateUrl: './consulta.html',
    styleUrl: './consulta.scss',
})
export class Consulta implements AfterViewInit {
    listaClientes: Cliente[] = [];
    nomeBusca: string = '';
    colunasTable: string[] = ['id', 'nome', 'cpf', 'email', 'dataNascimento'];
    ListaClientesData = new MatTableDataSource<Cliente>(); // inicializa vazio

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private serviceConsultar: ClientesService) {}
    ngOnInit() {
        this.listaClientes = this.serviceConsultar.pesquisarCliente('');
        this.ListaClientesData.data = this.listaClientes; // importante!
    }

    pesquisar() {
        this.listaClientes = this.serviceConsultar.pesquisarCliente(this.nomeBusca);
        this.ListaClientesData.data = this.listaClientes; // atualiza a tabela
    }

    ngAfterViewInit() {
        this.ListaClientesData.paginator = this.paginator;
    }
}
