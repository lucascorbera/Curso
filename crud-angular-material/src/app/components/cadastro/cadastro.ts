import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { FormsModule } from '@angular/forms'
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

  Salvar() {
    this.service.salvar(this.cliente);
  }
}
