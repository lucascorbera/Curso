import { Routes } from '@angular/router';
import { Cadastro } from './components/cadastro/cadastro';
import { Consulta } from './components/consulta/consulta';
import { ListaPontos } from './components/lista-pontos/lista-pontos';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, //  redireciona raiz para home
  { path: 'cadastro', component: Cadastro },
  { path: 'consulta', component: Consulta },
  { path: 'lista-pontos', component: ListaPontos },
  { path: 'home', component: Home },
  { path: '**', redirectTo: '/home' } // opcional: redireciona URLs inválidas para home
];
