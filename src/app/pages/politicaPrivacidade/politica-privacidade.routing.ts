import { Routes } from '@angular/router';
import { PoliticaPrivacidadeComponent } from './politica-privacidade.component';



export const PoliticaPrivacidadeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'politicaPrivacidade',
        component: PoliticaPrivacidadeComponent
      },
    ]
  }
];
