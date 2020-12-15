import { Routes } from '@angular/router';

import { AdmLigasComponent } from './adm-ligas.component';
import { GerenciarLigaComponent } from './gerenciar-liga/gerenciar-liga.component';

export const AdmLigasRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admLigas',
        component: AdmLigasComponent
      },
      {
        path: 'gerenciarLiga',
        component: GerenciarLigaComponent
      }
    ]
  }
];
