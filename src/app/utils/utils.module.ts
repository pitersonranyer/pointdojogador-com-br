import { FocoDirective } from './directives/foco.directive';
import { EsquerdaDirective } from './directives/esquerda.directive';
import { ToastModule } from 'primeng/toast';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { CinzaDirective } from './directives/ciza.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonModule, DialogModule, GrowlModule, MessageModule,
  MessagesModule, ProgressBarModule, ProgressSpinnerModule, MessageService
} from 'primeng/primeng';
import { BotaoDirective } from './directives/botao.directive';
import { CentroDirective } from './directives/centro.directive';
import { DireitaDirective } from './directives/direita.directive';
import { MaiusculaDirective } from './directives/maiuscula.directive';
import { MinusculaDirective } from './directives/minuscula.directive';
import { NgElseDirective } from './directives/ng-else.directive';
import { LimitPipe } from './pipes/limit.pipe';
import { MoedaPipe } from './pipes/moeda.pipe';
import { ReplacePipe } from './pipes/replace.pipe';
import { MaiusculaPipe } from './pipes/maiuscula.pipe';
import { MensageriaComponent } from './mensageria/mensageria.component';
import { TelefoneDirective } from './directives/telefone.directive';

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
    MensageriaComponent,
    AcessoNegadoComponent,

    NgElseDirective,
    DireitaDirective,
    EsquerdaDirective,
    CentroDirective,
    BotaoDirective,
    MaiusculaDirective,
    MinusculaDirective,
    CinzaDirective,
    TelefoneDirective,
    FocoDirective,

    LimitPipe,
    MoedaPipe,
    ReplacePipe,
    MaiusculaPipe
  ],
  exports: [
    MensageriaComponent,
    AcessoNegadoComponent,

    NgElseDirective,
    DireitaDirective,
    EsquerdaDirective,
    CentroDirective,
    BotaoDirective,
    MaiusculaDirective,
    MinusculaDirective,
    CinzaDirective,
    TelefoneDirective,
    FocoDirective,

    LimitPipe,
    MoedaPipe,
    ReplacePipe,
    MaiusculaPipe
  ],
  providers: [
    MessageService
  ]
})
export class UtilsModule { }
