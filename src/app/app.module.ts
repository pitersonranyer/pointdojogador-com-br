import { UsuarioService } from './services/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { LandingModule } from './landing/landing.module';
import { MensageriaService } from './services/mensageria.service';
import { UtilsModule } from './utils/utils.module';
import { UtilService } from './services/util.service';

@NgModule({
   imports: [
      BrowserModule,
      HttpClientModule,

      HomeModule,
      LoginModule,
      RegisterModule,
      LandingModule,

      AppRoutingModule,
      UtilsModule

   ],
   declarations: [
      AppComponent
   ],
   providers: [
      MensageriaService,
      UsuarioService,
      UtilService
   ],
   bootstrap: [AppComponent],
   

})
export class AppModule { }
