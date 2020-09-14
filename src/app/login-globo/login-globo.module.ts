import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginGloboComponent } from './login-globo.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule, InputTextModule } from 'primeng/primeng';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    ProgressSpinnerModule,
    UtilsModule,
    InputTextModule,
    FormsModule
    
  ],
  declarations: [LoginGloboComponent]
})
export class LoginGloboModule { }
