import { Injectable, inject, signal } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGoogleServices {
  private oauthService = inject(OAuthService);
  private router = inject(Router);

  public profile = signal<any>(null);
  public isAuthenticated = signal<boolean>(false);

  constructor() {
    // Configura OAuth
    this.oauthService.configure(authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
  }

  // Inicia login garantindo discovery document
  login() {
    this.oauthService.loadDiscoveryDocument().then(() => {
      this.oauthService.initLoginFlow();
    }).catch(err => {
      console.error('Erro ao carregar discovery document:', err);
    });
  }

  logout() {
    try { this.oauthService.revokeTokenAndLogout(); } catch {
      try { this.oauthService.logOut(); } catch {}
    }
    this.profile.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getLoggedProfile() {
    return this.profile();
  }

  setAuthenticated() {
    const valid = this.oauthService.hasValidAccessToken() || this.oauthService.hasValidIdToken();
    this.isAuthenticated.set(valid);
    if (valid) this.profile.set(this.oauthService.getIdentityClaims());
  }

  checkLoggedIn(): boolean {
    const valid = this.oauthService.hasValidAccessToken() || this.oauthService.hasValidIdToken();
    this.isAuthenticated.set(valid);
    if (valid) this.profile.set(this.oauthService.getIdentityClaims());
    return valid;
  }
}
