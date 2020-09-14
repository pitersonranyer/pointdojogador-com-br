import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalMeusTimesComponent } from './modal-meus-times.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';

import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/primeng';
import { UtilsModule } from 'src/app/utils/utils.module';


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
    UtilsModule,

  ],

  declarations: [
    ModalMeusTimesComponent
  ],
  exports: [
    ModalMeusTimesComponent
  ]


})
export class ModalMeusTimesModule { }
