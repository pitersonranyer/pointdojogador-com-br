import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { GalleriaModule } from 'primeng/galleria';
import { GrowlModule } from 'primeng/growl';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DataTableModule } from 'primeng/datatable';
import { DialogService, MessageService } from 'primeng/api';

import { MenuComponent, SubMenuComponent } from './menu.component';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { InicioModule } from '../inicio/inicio.module';
import { ListarTimesCartolaModule } from '../listar-times-cartola/listar-times-cartola.module';
import { ConsultaTimeCartolaModule } from '../consulta-time-cartola/consulta-time-cartola.module';
import { ListarTimesUsuarioCartolaModule } from '../listar-times-usuario-cartola/listar-times-usuario-cartola.module';
import { RodadaCartolaModule } from '../rodada-cartola/rodada-cartola.module';
import { CadastrarRodadaCartolaModule } from '../rodada-cartola/cadastrar-rodada-cartola/cadastrar-rodada-cartola.module';
import { ModalAddTimeRodadaModule } from '../modal/modal-add-time-rodada/modal-add-time-rodada.module';
import { ListarMeusJogosMeusPagamentosModule } from '../listar-meusjogos-meuspagamentos/listar-meusjogos-meuspagamentos.module';
import { ModalMeusTimesModule } from '../modal/modal-meus-times/modal-meus-times.module';
import { ListarPendenciaPagamentoModule } from '../listar-pendencia-pagamento/listar-pendencia-pagamentomodule';
import { ListarUsuariosModule } from '../listar-usuarios/listar-usuarios.module';
import { PerfilUsuarioModule } from '../perfil-usuario/perfil-usuario.module';
import { LoginGloboModule } from '../login-globo/login-globo.module';
import { UtilsModule } from '../utils/utils.module';
import { ProgressSpinnerModule } from 'primeng/primeng';
import { UtilService } from '../services/util.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenApiService } from '../interceptadores/token-api.service';
import { InvalidTokenApiService } from '../interceptadores/invalid-token-api.service';
import { AtribuirNovaSenhaUsuarioModule } from '../modal/atribuir-nova-senha-usuario/atribuir-nova-senha-usuario.module';
import { PerfilUsuarioAlterarSenhaModule } from '../modal/perfil-usuario-alterar-senha/perfil-usuario-alterar-senha.module';
import { ModalDetalheTimeUsuarioModule } from '../modal/detalhe-time-usuario/modal-detalhe-time-usuario.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,

    AccordionModule,
    AutoCompleteModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    ColorPickerModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    FullCalendarModule,
    GalleriaModule,
    GrowlModule,
    InplaceModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    ScrollPanelModule,
    SelectButtonModule,
    SlideMenuModule,
    SliderModule,
    SpinnerModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    VirtualScrollerModule,
    DataTableModule,
    ProgressSpinnerModule,



    InicioModule,
    DashboardModule,
    HomeRoutingModule,
    ListarTimesCartolaModule,
    ConsultaTimeCartolaModule,
    ListarTimesUsuarioCartolaModule,
    RodadaCartolaModule,
    CadastrarRodadaCartolaModule,
    ModalAddTimeRodadaModule,
    ModalMeusTimesModule,
    ListarMeusJogosMeusPagamentosModule,
    ListarPendenciaPagamentoModule,
    ListarUsuariosModule,
    PerfilUsuarioModule,
    LoginGloboModule,
    UtilsModule,
    AtribuirNovaSenhaUsuarioModule,
    PerfilUsuarioAlterarSenhaModule,
    ModalDetalheTimeUsuarioModule


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
    DialogService,
    MessageService,
    UtilService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenApiService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InvalidTokenApiService,
      multi: true
    }
  ],

})
export class HomeModule { }
