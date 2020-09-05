import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import {
  ConfirmDialogModule, DataTableModule, DialogModule, GrowlModule, InputTextModule,
  OverlayPanelModule, PanelModule, ScheduleModule, ScrollPanelModule, SelectButtonModule,
  TieredMenuModule, TooltipModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { SelectItemService } from '../services/select-item.service';
import { UtilService } from '../services/util.service';
import { UtilsModule } from '../utils/utils.module';
import { InicioModule } from './../inicio/inicio.module';
import { ConfiguracaoService } from './../services/configuracao.service';
import { DataHoraService } from './../services/data-hora.service';
import { ImagemService } from './../services/imagem.service';
import { MenuService } from './../services/menu.service';
import { UsuarioService } from './../services/usuario.service';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { MenuComponent, SubMenuComponent } from './menu.component';

@NgModule({
  imports: [
    CommonModule,

    ConfirmDialogModule,
    DialogModule,
    GrowlModule,
    PanelModule,
    RouterModule,
    ScrollPanelModule,
    TieredMenuModule,
    TooltipModule,
    DataTableModule,
    DropdownModule,
    SelectButtonModule,
    TableModule,
    KeyFilterModule,
    ScheduleModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayPanelModule,
    InputTextModule,

    InicioModule,

    HomeRoutingModule,
    UtilsModule

  ],
  declarations: [
    HomeComponent,
    MenuComponent,
    SubMenuComponent,
  ],
  exports: [
    HomeComponent,
  ],
  providers: [
    UtilService,
    ConfiguracaoService,
    DataHoraService,
    ImagemService,
    MenuService,
    UsuarioService,
    SelectItemService
  ]
})
export class HomeModule { }
