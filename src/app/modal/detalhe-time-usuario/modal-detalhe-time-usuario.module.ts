import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDetalheTimeUsuarioComponent } from './modal-detalhe-time-usuario.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';

import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';
import { UtilsModule } from 'src/app/utils/utils.module';
import { ProgressSpinnerModule } from 'primeng/primeng';


@NgModule({
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
    PanelModule,
    DynamicDialogModule,
    ProgressSpinnerModule,
    UtilsModule

  ],

  declarations: [
    ModalDetalheTimeUsuarioComponent
  ],
  exports: [
    ModalDetalheTimeUsuarioComponent
  ]


})
export class ModalDetalheTimeUsuarioModule { }
