import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';


const appRoutes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'landing', component: LandingComponent},
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
