import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculadora',
  imports: [FormsModule, CommonModule],
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.scss'
})
export class Calculadora {
  title = 'calculadora';
  numero1!: number;
  numero2!: number;
  resultado!: number;

  somar() {
    this.resultado = this.numero1 + this.numero2;
  }

}
