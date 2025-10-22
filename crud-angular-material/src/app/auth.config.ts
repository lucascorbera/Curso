import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin + '/login/callback',
    clientId: '',
    // A URL de redirecionamento após o login (precisa bater com o que está no Google Cloud)
    responseType: 'token id_token', // importante para SPA
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false,
    showDebugInformation: true,
    clearHashAfterLogin: true, // limpa hash da URL após processar login
};
