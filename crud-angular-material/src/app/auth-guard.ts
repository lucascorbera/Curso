import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGoogleServices } from './services/auth-google-services';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthGoogleServices);
  const router = inject(Router);

  const logged = authService.checkLoggedIn();

  if (!logged) {
    // Redireciona para login se não autenticado
    router.navigate(['/login']);
  }

  return logged;
};

export const redirectIfAuthenticated: CanActivateFn = (route, state) => {
  const authService = inject(AuthGoogleServices);
  const router = inject(Router);

  const logged = authService.checkLoggedIn();

  if (logged) {
    // Redireciona para home se já estiver autenticado
    router.navigate(['/home']);
  }

  return !logged;
};
