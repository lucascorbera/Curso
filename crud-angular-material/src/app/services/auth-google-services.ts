import { Injectable, inject, signal } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';
import { Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleServices {
    private oauthService = inject(OAuthService);
    private router = inject(Router);
    public userProfile = signal<any>(null);
    public isAuthenticated = signal<boolean>(false);

    profile = signal<any>(null);


    constructor() {
        this.initConfiguration();
    }

    initConfiguration() {
        this.oauthService.configure(authConfig);
        this.oauthService.setupAutomaticSilentRefresh();
        this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
            if (this.oauthService.hasValidAccessToken()) {
                this.profile.set(this.oauthService.getIdentityClaims());
            }
        });
    }

    login() {
        this.oauthService.initLoginFlow();
    }
    logout() {
        this.oauthService.revokeTokenAndLogout();
        this.oauthService.logOut();
        this.profile.set(null);
        this.router.navigate(['']);
    }

    getLoggedProfile(){
        return this.profile();
    }
}
