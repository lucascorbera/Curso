import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { Cadastro } from './components/cadastro/cadastro';
import { Consulta } from './components/consulta/consulta';
import { ListaPontos } from './components/lista-pontos/lista-pontos';
import { MainLayout } from './layout/main-layout/main-layout';
import { AuthLayout } from './layout/auth-layout';
import { authGuard, redirectIfAuthenticated } from './auth-guard';
import { LoginCallbackComponent } from './components/login-callback-component/login-callback-component';

export const routes: Routes = [
  // rotas públicas
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login, canActivate: [redirectIfAuthenticated] },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  // callback OAuth
  { path: 'login/callback', component: LoginCallbackComponent },

  // rotas protegidas
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: Home },
      { path: 'cadastro', component: Cadastro },
      { path: 'consulta', component: Consulta },
      { path: 'lista-pontos', component: ListaPontos },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'home' }
];
