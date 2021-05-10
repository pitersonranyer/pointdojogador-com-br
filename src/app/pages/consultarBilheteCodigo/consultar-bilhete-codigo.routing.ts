import { Routes } from '@angular/router';
import { ConsultarBilheteCodigoComponent } from './consultar-bilhete-codigo.component';



export const ConsultarBilheteCodigoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'consultarBilheteCodigo/:codigoBilhete',
        component: ConsultarBilheteCodigoComponent
      },
    ]
  }
];
