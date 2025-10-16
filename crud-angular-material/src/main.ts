import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideNgxMask } from 'ngx-mask';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideNgxMask({
      validation: true // ✅ ativa validação (opcional)
    }),
    provideHttpClient(withFetch()),
    provideOAuthClient()
  ]
}).catch((err) => console.error(err));
