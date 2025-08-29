import { Routes } from '@angular/router';
import { Cadastro } from './components/cadastro/cadastro'
import { Consulta } from './components/consulta/consulta'

export const routes: Routes = [
  { path: 'cadastro', component: Cadastro },
  { path: 'consulta', component: Consulta }
];
