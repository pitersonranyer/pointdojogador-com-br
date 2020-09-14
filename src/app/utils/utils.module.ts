import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonModule, DialogModule, GrowlModule, MessageModule,
  MessagesModule, ProgressBarModule, ProgressSpinnerModule, MessageService
} from 'primeng/primeng';
import { MensageriaComponent } from './mensageria/mensageria.component';

@NgModule({
  imports: [
    CommonModule,
    ToastModule,

    DialogModule,
    GrowlModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    ProgressBarModule,
    ProgressSpinnerModule,
  ],
  declarations: [
    MensageriaComponent
  ],
  exports: [
    MensageriaComponent
  ],
  providers: [
    MessageService
  ]
})
export class UtilsModule { }
