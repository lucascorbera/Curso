import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
//import { ClientesService } from '../../services/ClientesService';
import { Cliente } from '../cadastro/Cliente';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, inject } from '@angular/core';
import { ClienteApiService } from '../../services/cliente-api-service';
import {
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { model, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface InterfaceClienteDialog {
    idClienteI: string;
    nameClienteI: string;
}
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
    readonly name = model('');
    readonly dialog = inject(MatDialog);
    readonly clienteID = signal('');
    listaClientes: Cliente[] = [];
    nomeBusca: string = '';
    colunasTable: string[] = ['id', 'nome', 'cpf', 'email', 'dataNascimento', 'acao'];
    ListaClientesData = new MatTableDataSource<Cliente>(); // inicializa vazio

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        //private serviceConsultar: ClientesService,
        private router: Router,
        private ClienteApiService: ClienteApiService
    ) {}
    ngOnInit() {
        this.ClienteApiService.ListarClientes().subscribe({
            next: (clientes) => {
                this.listaClientes = clientes;
                this.ListaClientesData.data = this.listaClientes; // importante!
            },
            error: (erro) => {
                console.error('Erro ao listar clientes via API:', erro);
            },
        });
    }

    pesquisar() {
        this.ClienteApiService.PesquisarClienteNome(this.nomeBusca).subscribe({
            next: (clientes) => {
                this.listaClientes = clientes;
                this.ListaClientesData.data = this.listaClientes; // atualiza a tabela
            },
            error: (erro) => {
                console.error('Erro ao pesquisar cliente via API:', erro);
            },
        });
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

    openDialog(idCliente: string, nameCliente: string): void {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            data: { nameClienteI: nameCliente, idClienteI: idCliente },
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('Fechando a janela', result);
            if (result) {
                this.deletar(result);
            }
        });
    }

    deletar(id: string): void {
        //this.serviceConsultar.deletar(id);
        this.ClienteApiService.DeletarCliente(id).subscribe({
            next: () => {
                console.log('Cliente deletado via API com sucesso');
                this.ClienteApiService.ListarClientes().subscribe({
                    next: (clientes) => {
                        this.listaClientes = clientes;
                        this.ListaClientesData.data = this.listaClientes; // importante!
                    },
                    error: (erro) => {
                        console.error('Erro ao listar clientes via API:', erro);
                    },
                });
            },
            error: (erro) => {
                console.error('Erro ao deletar cliente via API:', erro);
            },
        });
    }
}
@Component({
    selector: 'app-consulta',
    templateUrl: './consultaDialog.html',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
    ],
})
export class DialogOverviewExampleDialog {
    readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
    readonly data = inject<InterfaceClienteDialog>(MAT_DIALOG_DATA);
    readonly clienteIDAqui = model(this.data.idClienteI);

    onNoClick(): void {
        this.dialogRef.close();
    }
}
