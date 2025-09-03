import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ClientesService } from '../../services/ClientesService';
import { Cliente } from '../cadastro/Cliente';
import { CommonModule } from '@angular/common';

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
    ],
    templateUrl: './consulta.html',
    styleUrl: './consulta.scss',
})
export class Consulta {
    listaClientes: Cliente[] = [];
    nomeBusca: string = '';
    constructor(private serviceConsultar: ClientesService) {}

    colunasTable: string[] = ['id', 'nome', 'cpf', 'email', 'dataNascimento'];
    // esse ngOnInit serve para carergar algum dado na tela antes dela ser axibida como se fosse o onload
    ngOnInit() {
        console.log('Pasosu aqui assim que eu carreguei ');
        this.listaClientes = this.serviceConsultar.pesquisarCliente('');
    }

    pesquisar() {
        this.listaClientes = this.serviceConsultar.pesquisarCliente(this.nomeBusca);
    }
}
