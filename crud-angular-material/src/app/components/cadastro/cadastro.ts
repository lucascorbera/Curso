import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, type NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Cliente } from './Cliente';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ClientesService } from '../../services/ClientesService';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-cadastro',
    imports: [
        FlexLayoutModule,
        MatCardModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        NgxMaskDirective,
    ],
    templateUrl: './cadastro.html',
    styleUrls: ['./cadastro.scss'],
})
export class Cadastro {
    cliente: Cliente = Cliente.newCliente();

    constructor(
        private service: ClientesService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    Salvar(form: NgForm) {
        if (this.id) {
            console.log('vou atualizar meu cadastro', this.cliente);
            this.service.atualizar(this.cliente);
            this.router.navigate(['consulta'], { replaceUrl: true });
        } else {
            console.log('vou salvar um novo cadastro', this.cliente);
            this.service.salvar(this.cliente);

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
                this.cliente = this.service.getClienteById(this.id);
            } else {
                this.cliente = Cliente.newCliente();
            }
        });
    }
}
