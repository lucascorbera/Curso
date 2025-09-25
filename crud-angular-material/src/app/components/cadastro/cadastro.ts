import { Component, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, type NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Cliente } from './Cliente';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
//import { ClientesService } from '../../services/ClientesService';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrasilApiService } from '../../services/Brasil-api-service';
import { Estado, Municipio } from '../../Models/brasil-api-models/brasil-api-models-module';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClienteApiService } from '../../services/cliente-api-service';

@Component({
    selector: 'app-cadastro',
    providers: [provideNgxMask()],
    standalone: true,
    imports: [
        FlexLayoutModule,
        MatCardModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        NgxMaskDirective,
        MatSelectModule,
        CommonModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './cadastro.html',
    styleUrls: ['./cadastro.scss'],
})
export class Cadastro {
    cliente: Cliente = Cliente.newCliente();

    varSnackBar: MatSnackBar = inject(MatSnackBar);
    ufs: Estado[] = [];
    municipios: Municipio[] = [];

    constructor(
        //private service: ClientesService,
        private route: ActivatedRoute,
        private router: Router,
        private ServiceApiBrasil: BrasilApiService,
        private ClienteApiService: ClienteApiService
    ) {}

    onCepChange(cep: string | null) {
        if (!cep) {
            return;
        } // <- evita erro se for null ou vazio

        const cepLimpo = cep.replace(/\D/g, '');

        if (cepLimpo.length === 8) {
            this.buscarEndereco(cepLimpo);
        }
    }
    loadingCep = false;
    buscarEndereco(cep: string) {
        try {
            this.loadingCep = true;
            this.ServiceApiBrasil.buscarEnderecoPorCep(cep).subscribe({
                next: (dadosCep) => {
                    this.cliente.endereco = dadosCep.street;
                    this.cliente.estado = dadosCep.state;
                    this.cliente.bairro = dadosCep.neighborhood;
                    console.log('Endereço encontrado:', dadosCep);
                    this.ServiceApiBrasil.listarMunicipios(dadosCep.state).subscribe({
                        next: (dados) => {
                            this.municipios = dados;
                            this.cliente.municipio =
                                dados.find(
                                    (m) => m.nome.toUpperCase() === dadosCep.city.toUpperCase()
                                )?.nome || '';
                            console.log('Municípios carregados:', this.municipios);
                        },
                        error: (erro) => {
                            console.error('Erro ao carregar Municípios:', erro);
                        },
                    });
                },
                error: (erro) => {
                    console.error('Erro ao buscar endereço:', erro);
                    this.mandarMsgSnackbar('Erro ao buscar endereço pelo CEP', 'Fechar');
                    this.cliente.endereco = '';
                    this.cliente.cep = '';
                    this.loadingCep = false;
                    this.cliente.bairro = '';
                    this.cliente.municipio = '';
                    this.cliente.estado = '';
                },
                complete: () => (this.loadingCep = false),
            });
        } catch (error) {
            console.error('Erro inesperado ao buscar endereço:', error);
            this.mandarMsgSnackbar('Erro inesperado ao buscar endereço', 'Fechar');
            this.cliente.endereco = '';
            this.cliente.cep = '';
            this.loadingCep = false;
            this.cliente.bairro = '';
            this.cliente.municipio = '';
            this.cliente.estado = '';
        }
    }

    Salvar(form: NgForm) {
        if (this.id) {
            console.log('vou atualizar meu cadastro', this.cliente);
            //this.service.atualizar(this.cliente);
            this.router.navigate(['consulta'], { replaceUrl: true });
            this.ClienteApiService.AtualizarCliente(this.cliente).subscribe({
                next: (clienteAtualizado) => {
                    console.log('Cliente atualizado via API:', clienteAtualizado);
                    this.mandarMsgSnackbar('Cliente atualizado com sucesso!', 'Fechar');
                },
                error: (erro) => {
                    console.error('Erro ao atualizar cliente via API:', erro);
                },
            });
        } else {
            console.log('vou salvar um novo cadastro', this.cliente);
            //this.service.salvar(this.cliente);
            this.ClienteApiService.InserirCliente(this.cliente).subscribe({
                next: (clienteInserido) => {
                    console.log('Cliente inserido via API:', clienteInserido);
                },
                error: (erro) => {
                    console.error('Erro ao inserir cliente via API:', erro);
                },
            });
            // limpa o formulário corretamente
            form.resetForm({
                nome: this.cliente.nome, // mantém valor se quiser
                email: this.cliente.email,
                cpf: this.cliente.cpf,
                dataNascimento: this.cliente.dataNascimento,
            });

            // ou só form.resetForm() para limpar tudo
            this.cliente = Cliente.newCliente();
        }
    }

    Limpar(form?: NgForm) {
        this.cliente = Cliente.newCliente();
        form?.resetForm(); // opcional: limpa estados de validade/dirty/touched
    }
    id: string | null = null;
    ngOnInit() {
        // Forma 1 - pega o valor só uma vez, quando o componente inicia
        this.id = this.route.snapshot.queryParamMap.get('id');

        console.log('ID recebido pela URL:', this.id);

        // Forma 2 - fica "escutando", caso     os query params mudem sem recarregar
        this.route.queryParamMap.subscribe((params) => {
            this.id = params.get('id');
            console.log('ID atualizado:', this.id);
            if (this.id) {
                //this.cliente = this.service.getClienteById(this.id);
                if (this.cliente.estado) {
                    const event = { value: this.cliente.estado } as MatSelectChange;
                    this.carregarMunicipios(event);
                }
            } else {
                this.cliente = Cliente.newCliente();
            }
        });

        this.carregarUfs();
    }
    mandarMsgSnackbar(message: string, action: string) {
        this.varSnackBar.open(message, action, {
            duration: 2000,
        });
    }

    carregarUfs() {
        this.ServiceApiBrasil.listarUFs().subscribe({
            next: (dados) => {
                this.ufs = dados;
                console.log('UFs carregadas:', this.ufs);
            },
            error: (erro) => {
                console.error('Erro ao carregar UFs:', erro);
            },
        });
    }

    carregarMunicipios(event: MatSelectChange) {
        const uf = event.value;
        this.ServiceApiBrasil.listarMunicipios(uf).subscribe({
            next: (dados) => {
                this.municipios = dados;
                console.log('Municípios carregados:', this.municipios);
            },
            error: (erro) => {
                console.error('Erro ao carregar Municípios:', erro);
            },
        });
    }
}
