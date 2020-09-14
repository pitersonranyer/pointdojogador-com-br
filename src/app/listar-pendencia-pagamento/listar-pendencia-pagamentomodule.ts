import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarPendenciaPagamentoComponent } from './listar-pendencia-pagamento.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/primeng';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    UtilsModule,
  ],
  declarations: [
    ListarPendenciaPagamentoComponent
  ],
  exports: [
    ListarPendenciaPagamentoComponent
  ]
})
export class ListarPendenciaPagamentoModule { }
