import { AuthService } from '../services/auth.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputTextModule, ButtonModule, ConfirmDialogModule, ConfirmationService,
    PasswordModule, ProgressSpinnerModule, InputMaskModule } from 'primeng/primeng';


import { PanelModule } from 'primeng/panel';

import {CardModule} from 'primeng/card';




import { LandingComponent } from './landing.component';

import { AuthGuard } from '../guards/auth.guard';


import { UsuarioService } from '../services/usuario.service';
import { RouterModule } from '@angular/router';
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

    PanelModule,
    CardModule,

    UtilsModule,


  ],
  declarations: [
    LandingComponent
  ],
  exports: [
    LandingComponent
  ],
  providers: [
    ConfirmationService,

    AuthGuard,
    AuthService,
    UsuarioService,
  ]
})
export class LandingModule { }