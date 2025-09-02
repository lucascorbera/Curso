import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { FormsModule, type NgForm } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { Cliente } from './Cliente';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ClientesService } from '../../services/ClientesService';

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
    NgxMaskDirective
  ],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.scss']
})
export class Cadastro {



  cliente: Cliente = Cliente.newCliente();


  constructor(private service: ClientesService) { }

  Salvar(form: NgForm) {
  this.service.salvar(this.cliente);

  // limpa o formulário corretamente
  form.resetForm({
    nome: this.cliente.nome,       // mantém valor se quiser
    email: this.cliente.email,
    cpf: this.cliente.cpf,
    dataNascimento: this.cliente.dataNascimento
  });

  // ou só form.resetForm() para limpar tudo
  this.cliente = Cliente.newCliente();
  }
}
