import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    // Exemplo simples: lê token do localStorage.
    // Você pode trocar por uma chamada de login real que retorna token.
    getToken(): string | null {
        return localStorage.getItem('jira_token');
    }

    // Helper opcional para usar Basic Auth com email:apiToken
    getBasicAuthHeader(email: string, apiToken: string): string {
        return 'Basic ' + btoa(`${email}:${apiToken}`);
    }
}
