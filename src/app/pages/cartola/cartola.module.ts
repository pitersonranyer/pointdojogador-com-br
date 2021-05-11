import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartolaRoutes } from './cartola.routing';
import { MeusTimesComponent } from './meus-times/meus-times.component';
import { MinhasLigasComponent } from './minhas-ligas/minhas-ligas.component';
import { ParticiparDaRodadaComponent } from './participar-da-rodada/participar-da-rodada.component';
import { ModalAddTimeRodadaComponent } from './participar-da-rodada/modal-add-time-rodada/modal-add-time-rodada.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginGloboComponent } from './meus-times/modal-login-globo/login-globo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarTimesCartolaComponent } from './meus-times/modal-listar-times-cartola/listar-times-cartola.component';
import { ListarPendenciaPagamentoComponent } from './listar-pendencia-pagamento/listar-pendencia-pagamento.component';
import { RodadaCartolaComponent } from './gerenciar-rodada-cartola/listar/rodada-cartola.component';
import { ListarTimesDaRodadaComponent } from './listar-times-da-rodada/listar-times-da-rodada.component';
import { CadastrarRodadaCartolaComponent } from './gerenciar-rodada-cartola/cadastrar/cadastrar-rodada-cartola.component';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { AtribuirNovaSenhaComponent } from './listar-usuarios/modal-atribuir-nova-senha/atribuir-nova-senha.component';
import { ModalAddTimeUsuarioComponent } from './listar-usuarios/modal-add-time-usuario/modal-add-time-usuario.component';
import { ModalDetalheTimeUsuarioComponent } from './participar-da-rodada/modal-detalhe-time-usuario/modal-detalhe-time-usuario.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ModalAlterarSenhaComponent } from './user-profile/modal-alterar-senha/modal-alterar-senha.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminGuard } from 'src/app/components/guards/admin.guard';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AlterarRodadaCartolaComponent } from './gerenciar-rodada-cartola/alterar/alterar-rodada-cartola.component';
import { NgxMaskModule } from 'ngx-mask';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { GerarBilheteComponent } from './gerar-bilhete/gerar-bilhete.component';
import { ConsultarBilheteComponent } from './consultarBilhete/consultar-bilhete.component';
import { ModalTimesFavoritosComponent } from './gerar-bilhete/modal-times-favoritos/modal-times-favoritos.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CartolaRoutes),
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    JwBootstrapSwitchNg2Module,
    NgxMaskModule.forRoot()

  ],
  declarations: [MeusTimesComponent,
    MinhasLigasComponent,
    ParticiparDaRodadaComponent,
    ModalAddTimeRodadaComponent,
    ModalTimesFavoritosComponent,
    LoginGloboComponent,
    ListarTimesCartolaComponent,
    ListarPendenciaPagamentoComponent,
    RodadaCartolaComponent,
    ListarTimesDaRodadaComponent,
    CadastrarRodadaCartolaComponent,
    ListarUsuariosComponent,
    AtribuirNovaSenhaComponent,
    ModalAddTimeUsuarioComponent,
    ModalDetalheTimeUsuarioComponent,
    UserProfileComponent,
    ModalAlterarSenhaComponent,
    AlterarRodadaCartolaComponent,
    GerarBilheteComponent,
    ConsultarBilheteComponent
    
  ],
  exports: [

  ],
  providers: [AdminGuard ],
  
  entryComponents: [ModalAddTimeRodadaComponent,
    ModalTimesFavoritosComponent,
    LoginGloboComponent,
    ListarTimesCartolaComponent,
    AtribuirNovaSenhaComponent,
    ModalAddTimeUsuarioComponent,
    ModalDetalheTimeUsuarioComponent,
    ModalAlterarSenhaComponent]
})
export class CartolaModule { }
