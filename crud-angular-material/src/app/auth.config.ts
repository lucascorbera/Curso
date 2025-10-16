import { AuthConfig } from "angular-oauth2-oidc";


export const authConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin,
    clientId: '617399892327-lrchq2gntr5a9o7b9vhvr22qeagbmjk4.apps.googleusercontent.com',
    scope: 'openid profile email', // 'openid profile email api offline_access'
    responseType: 'code',
    showDebugInformation: true,
    strictDiscoveryDocumentValidation: false,
};
