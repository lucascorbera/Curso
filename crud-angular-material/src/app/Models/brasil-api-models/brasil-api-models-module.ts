import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [],
    imports: [CommonModule],
})
export class BrasilApiModelsModule {}

export interface Estado {
    nome: string;
    sigla: string;
}
export interface Municipio {
    nome: string;
    codigo_ibge: string;
}
