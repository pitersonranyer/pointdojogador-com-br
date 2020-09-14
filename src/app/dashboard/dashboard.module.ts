import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { PanelModule, ButtonModule, ProgressSpinnerModule, DialogModule, MessageModule, MessagesModule } from 'primeng/primeng';
import { UtilsModule } from '../utils/utils.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    PanelModule,
    FormsModule,
    ProgressSpinnerModule,
    BrowserAnimationsModule,
    UtilsModule,
    DialogModule,
    ToastModule,
    MessageModule,
    MessagesModule,

  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
