import { AuthService } from './../services/auth.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';


import { InputTextModule, ButtonModule, ConfirmDialogModule, ConfirmationService,
    PasswordModule, ProgressSpinnerModule, InputMaskModule } from 'primeng/primeng';

import { ToastModule } from 'primeng/toast';


import { LoginComponent } from './login.component';

import { AuthGuard } from './../guards/auth.guard';


import { UsuarioService } from '../services/usuario.service';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    ButtonModule,
    HttpClientModule,

    ProgressSpinnerModule,
    InputMaskModule,
    RouterModule,

    PasswordModule,
    InputTextModule,
    ConfirmDialogModule,

    ToastModule,
    UtilsModule


  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    ConfirmationService,

    AuthGuard,
    AuthService,
    UsuarioService,
  ]
})
export class LoginModule { }
