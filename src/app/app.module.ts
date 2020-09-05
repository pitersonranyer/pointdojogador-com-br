import { MensageriaService } from './services/mensageria.service';
import { UsuarioService } from './services/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { InterceptorModule } from './security/interceptors/interceptor.module';
import { UtilService } from './services/util.service';
import { AcessoNegadoComponent } from './utils/acesso-negado/acesso-negado.component';
import { PaginaNaoEncontradaComponent } from './utils/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { UtilsModule } from './utils/utils.module';


@NgModule({
   imports: [
      BrowserModule,
      HttpClientModule,

      HomeModule,
      LoginModule,

      InterceptorModule,
      UtilsModule,

      AppRoutingModule,
   ],
   declarations: [
      AppComponent,
      PaginaNaoEncontradaComponent
   ],
   exports: [
      PaginaNaoEncontradaComponent
   ],
   providers: [
      MensageriaService,
      UtilService,
      UsuarioService
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
