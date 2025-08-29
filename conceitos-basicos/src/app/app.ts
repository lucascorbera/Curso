import { Component, signal } from '@angular/core';
import { Calculadora } from './components/calculadora/calculadora';
import { ListaCompras } from './components/lista-compras/lista-compras';

@Component({
  selector: 'app-root',
  imports: [ListaCompras],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('conceitos-basicos');
}
