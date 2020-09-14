import { AuthService } from '../services/auth.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputTextModule, ButtonModule, ConfirmDialogModule, ConfirmationService,
    PasswordModule, ProgressSpinnerModule, InputMaskModule, PanelModule } from 'primeng/primeng';

import { CarouselModule } from 'primeng/carousel';
import { TableModule } from 'primeng/table';

import {  DataTableModule } from 'primeng/datatable';

import { AuthGuard } from '../guards/auth.guard';

import { UsuarioService } from '../services/usuario.service';
import { RouterModule } from '@angular/router';
import { ListarTimesUsuarioCartolaComponent } from './listar-times-usuario-cartola.component';
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
    CarouselModule,
    TableModule,
    DataTableModule,
    PanelModule,
    UtilsModule,


  ],
  declarations: [
    ListarTimesUsuarioCartolaComponent
  ],
  exports: [
    ListarTimesUsuarioCartolaComponent
  ],
  providers: [
    ConfirmationService,

    AuthGuard,
    AuthService,
    UsuarioService,
  ]
})
export class ListarTimesUsuarioCartolaModule { }
