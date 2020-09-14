import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarMeusJogosMeusPagamentosComponent } from './listar-meusjogos-meuspagamentos.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/primeng';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ProgressSpinnerModule,
    UtilsModule,
  ],
  declarations: [
    ListarMeusJogosMeusPagamentosComponent
  ],
  exports: [
    ListarMeusJogosMeusPagamentosComponent
  ]
})
export class ListarMeusJogosMeusPagamentosModule { }
