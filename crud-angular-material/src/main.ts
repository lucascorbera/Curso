import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideNgxMask } from 'ngx-mask';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideNgxMask({
      validation: true // ✅ ativa validação (opcional)
    })
  ]
}).catch((err) => console.error(err));
