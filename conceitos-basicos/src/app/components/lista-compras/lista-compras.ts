import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemLista } from './ItemLista';
import { CommonModule } from '@angular/common'; // necessário para ngClass, ngIf, ngFor


@Component({
  selector: 'app-lista-compras',
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-compras.html',
  styleUrl: './lista-compras.scss'
})
export class ListaCompras {

    novoItem: string = '';
    listaItems: ItemLista[] = [];

    adicionarItem() {

      let item = new ItemLista();
      item.nome = this.novoItem;
      item.id = this.listaItems.length + 1;

      this.listaItems.push(item);
      this.novoItem = '';

      console.table(this.listaItems);
    }

    riscarItem(elemento: ItemLista) {
      elemento.comprado = !elemento.comprado;
    }
}
