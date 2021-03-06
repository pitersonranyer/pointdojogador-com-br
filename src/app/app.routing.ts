import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
      },

      {
        path: 'cartola',
        loadChildren: './pages/cartola/cartola.module#CartolaModule'
      },

      {
        path: 'adm-ligas',
        loadChildren: './pages/adm-ligas/adm-ligas.module#AdmLigasModule'
      },

      {
        path: 'consultar-bilhete-codigo',
        loadChildren: './pages/consultarBilheteCodigo/consultar-bilhete-codigo.module#ConsultarBilheteCodigoModule'
      },

      {
        path: 'politica-privacidade',
        loadChildren: './pages/politicaPrivacidade/politica-privacidade.module#PoliticaPrivacidadeModule'
      },

    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'pages',
        loadChildren: './pages/pages/pages.module#PagesModule'
      }
    ]
  }
];
