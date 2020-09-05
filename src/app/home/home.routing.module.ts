import { InicioComponent } from './../inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../security/guards/auth.guard';
import { HomeComponent } from './home.component';


const homeRoutes = [
    {
        path: ''
        , component: HomeComponent
        , canActivate: [AuthGuard]
        , children: [
            {
                path: 'inicio',
                component: InicioComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
                loadChildren: '../../app/inicio/inicio.module#InicioModule'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes),
    ],
    exports: [RouterModule],
})
export class HomeRoutingModule { }
