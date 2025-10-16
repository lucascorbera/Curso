import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideNgxMask } from 'ngx-mask';
<<<<<<< HEAD
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
=======
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient, withFetch } from '@angular/common/http';
>>>>>>> e5272be5432c89b6055391fd4a433d07be3a7dc1

Chart.register(...registerables, ChartDataLabels);
bootstrapApplication(App, {
<<<<<<< HEAD
    ...appConfig,
    providers: [
        ...(appConfig.providers || []),
        provideNgxMask({
            validation: true, // ✅ ativa validação (opcional)
        }),
    ],
=======
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideNgxMask({
      validation: true // ✅ ativa validação (opcional)
    }),
    provideHttpClient(withFetch()),
    provideOAuthClient()
  ]
>>>>>>> e5272be5432c89b6055391fd4a433d07be3a7dc1
}).catch((err) => console.error(err));
