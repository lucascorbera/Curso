import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthGoogleServices } from '../../services/auth-google-services';

@Component({
  selector: 'app-login-callback',
  template: `<p>Processando login...</p>`,
})
export class LoginCallbackComponent implements OnInit {
  constructor(
    private oauthService: OAuthService,
    private authService: AuthGoogleServices,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      // Carrega endpoints do Google
      await this.oauthService.loadDiscoveryDocument();

      // Processa callback e extrai token da URL
      const loggedIn = await this.oauthService.tryLogin();

      // Se token válido, atualiza serviço e redireciona
      if (this.oauthService.hasValidAccessToken() || this.oauthService.hasValidIdToken()) {
        this.authService.setAuthenticated(); // atualiza sinais
        this.router.navigate(['/home']);
      } else {
        console.error('Token inválido ou não encontrado.');
        this.router.navigate(['/login']);
      }
    } catch (err) {
      console.error('Erro no login callback:', err);
      this.router.navigate(['/login']);
    }
  }
}
