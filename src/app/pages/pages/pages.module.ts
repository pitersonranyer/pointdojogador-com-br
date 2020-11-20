import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PagesRoutes } from './pages.routing';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from 'src/app/services/util.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenApiService } from 'src/app/interceptadores/token-api.service';
import { InvalidTokenApiService } from 'src/app/interceptadores/invalid-token-api.service';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    JwBootstrapSwitchNg2Module,
    NgbModule,
    NgxMaskModule.forRoot()

  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    UtilService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenApiService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InvalidTokenApiService,
      multi: true
    }
  ],
})
export class PagesModule { }
