import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin + '/login/callback',
    clientId: '617399892327-lrchq2gntr5a9o7b9vhvr22qeagbmjk4.apps.googleusercontent.com',
    // A URL de redirecionamento após o login (precisa bater com o que está no Google Cloud)
    responseType: 'token id_token', // importante para SPA
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false,
    showDebugInformation: true,
    clearHashAfterLogin: true, // limpa hash da URL após processar login
};
