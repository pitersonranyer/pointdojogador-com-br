import { Routes } from '@angular/router';
import { AdminGuard } from 'src/app/components/guards/admin.guard';
import { AuthGuard } from 'src/app/components/guards/auth.guard';
import { GerarBilheteComponent } from './gerar-bilhete/gerar-bilhete.component';
import { AlterarRodadaCartolaComponent } from './gerenciar-rodada-cartola/alterar/alterar-rodada-cartola.component';
import { CadastrarRodadaCartolaComponent } from './gerenciar-rodada-cartola/cadastrar/cadastrar-rodada-cartola.component';
import { RodadaCartolaComponent } from './gerenciar-rodada-cartola/listar/rodada-cartola.component';
import { ListarPendenciaPagamentoComponent } from './listar-pendencia-pagamento/listar-pendencia-pagamento.component';
import { ListarTimesDaRodadaComponent } from './listar-times-da-rodada/listar-times-da-rodada.component';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { MeusTimesComponent } from './meus-times/meus-times.component';
import { MinhasLigasComponent } from './minhas-ligas/minhas-ligas.component';
import { ParticiparDaRodadaComponent } from './participar-da-rodada/participar-da-rodada.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


export const CartolaRoutes: Routes = [
  /**
     * @description Rotas do admistrador de sistemas
     */

  {
    path: '',
    canActivateChild: [AdminGuard],
    children: [
      {
        path: 'listarPendenciaPagamento',
        component: ListarPendenciaPagamentoComponent,
      },
      {
        path: 'listarRodadaCartola',
        component: RodadaCartolaComponent,

      },
      {
        path: 'cadastrarRodadaCartola',
        component: CadastrarRodadaCartolaComponent,

      },
      {
        path: 'listarUsuarios',
        component: ListarUsuariosComponent,

      },

      {
        path: 'alterarRodadaCartola',
        component: AlterarRodadaCartolaComponent,
      },
    ],
  },

  /**
   * @description Rotas livres --- sem login
   */

  {
    path: 'participarDaRodada',
    component: ParticiparDaRodadaComponent
  },
  {
    path: 'listarTimesDaRodada',
    component: ListarTimesDaRodadaComponent
  },
  {
    path: 'gerarBilhete',
    component: GerarBilheteComponent
  },

 


  /**
 * @description Rotas com autenticação
 */

  {
    path: 'meusTimes',
    component: MeusTimesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'minhasLigas',
    component: MinhasLigasComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'listarPendenciaPagamento',
    component: ListarPendenciaPagamentoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  }
];
