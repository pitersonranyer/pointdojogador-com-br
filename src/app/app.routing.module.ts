import { AcessoNegadoComponent } from './utils/acesso-negado/acesso-negado.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PaginaNaoEncontradaComponent } from './utils/pagina-nao-encontrada/pagina-nao-encontrada.component';

const appRoutes = [
    { path: 'login', component: LoginComponent},
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
    { path: 'acesso-negado', component: AcessoNegadoComponent},
    { path: '', loadChildren: '../app/home/home.module#HomeModule'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
    ],
    exports : [
        RouterModule,
    ],
})
export class AppRoutingModule {}
