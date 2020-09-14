import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/primeng';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ProgressSpinnerModule,
    UtilsModule,
  ],
  declarations: [InicioComponent]
})
export class InicioModule { }
