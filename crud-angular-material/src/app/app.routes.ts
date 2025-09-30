import { Routes } from '@angular/router';
import { Cadastro } from './components/cadastro/cadastro';
import { Consulta } from './components/consulta/consulta';
import { ListaPontos } from './components/lista-pontos/lista-pontos';

export const routes: Routes = [
    { path: 'cadastro', component: Cadastro },
    { path: 'consulta', component: Consulta },
    { path: 'lista-pontos', component: ListaPontos },
];
