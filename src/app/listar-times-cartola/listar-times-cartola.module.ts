import { AuthService } from '../services/auth.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputTextModule, ButtonModule, ConfirmDialogModule, ConfirmationService,
    PasswordModule, ProgressSpinnerModule, InputMaskModule, PanelModule, DialogModule } from 'primeng/primeng';

import { CarouselModule } from 'primeng/carousel';
import { TableModule } from 'primeng/table';

import {  DataTableModule } from 'primeng/datatable';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';

import { AuthGuard } from '../guards/auth.guard';

import { UsuarioService } from '../services/usuario.service';
import { RouterModule } from '@angular/router';
import { ListarTimesCartolaComponent } from './listar-times-cartola.component';
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
    DialogModule,
    DynamicDialogModule,

    UtilsModule


  ],
  declarations: [
    ListarTimesCartolaComponent
  ],
  exports: [
    ListarTimesCartolaComponent
  ],
  providers: [
    ConfirmationService,

    AuthGuard,
    AuthService,
    UsuarioService,
  ]
})
export class ListarTimesCartolaModule { }
