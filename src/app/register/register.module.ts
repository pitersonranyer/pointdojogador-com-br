import { AuthService } from '../services/auth.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import {
  InputTextModule, ButtonModule, ConfirmDialogModule, ConfirmationService,
  PasswordModule, ProgressSpinnerModule, InputMaskModule
} from 'primeng/primeng';

import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';

import { ToastModule } from 'primeng/toast';


import { RegisterComponent } from './register.component';

import { AuthGuard } from '../guards/auth.guard';


import { UsuarioService } from '../services/usuario.service';
import { UtilsModule } from '../utils/utils.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    FormsModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    ButtonModule,
    HttpClientModule,

    ProgressSpinnerModule,
    InputMaskModule,

    PasswordModule,
    InputTextModule,
    ConfirmDialogModule,

    ToastModule,
    DropdownModule,
    CheckboxModule,
    UtilsModule,


  ],
  declarations: [
    RegisterComponent
  ],
  exports: [
    RegisterComponent
  ],
  providers: [
    ConfirmationService,

    AuthGuard,
    AuthService,
    UsuarioService,
  ]
})
export class RegisterModule { }
