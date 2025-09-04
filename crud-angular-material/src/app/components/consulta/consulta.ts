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
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, inject } from '@angular/core';
import {
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
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
    colunasTable: string[] = ['id', 'nome', 'cpf', 'email', 'dataNascimento', 'acao'];
    ListaClientesData = new MatTableDataSource<Cliente>(); // inicializa vazio

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private serviceConsultar: ClientesService, private router: Router) {}
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

    preparaEditar(id: string) {
        console.log('Editar: ' + id);
        this.router.navigate(['/cadastro'], {
            queryParams: { id: id },
            queryParamsHandling: 'merge',
        });
    }

    readonly dialog = inject(MatDialog);

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this.dialog.open(DialogAnimationsExampleDialog, {
            width: '500px',
            enterAnimationDuration,
            exitAnimationDuration,
        });
    }
}
@Component({
    selector: 'app-consulta',
    templateUrl: './consultaDialog.html',
    imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsExampleDialog {
    readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
}
