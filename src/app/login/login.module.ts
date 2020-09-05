import { AuthService } from './../services/auth.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputTextModule, ButtonModule, ConfirmDialogModule, ConfirmationService,
    PasswordModule, ProgressSpinnerModule, InputMaskModule } from 'primeng/primeng';

import { UtilsModule } from './../utils/utils.module';

import { LoginComponent } from './login.component';

import { AuthGuard } from './../security/guards/auth.guard';


import { UsuarioService } from '../services/usuario.service';

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

    PasswordModule,
    UtilsModule,
    InputTextModule,
    ConfirmDialogModule,


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
