import { InicioComponent } from './../inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ListarTimesCartolaComponent } from '../listar-times-cartola/listar-times-cartola.component';
import { ConsultaTimeCartolaComponent } from '../consulta-time-cartola/consulta-time-cartola.component';
import { ListarTimesUsuarioCartolaComponent } from '../listar-times-usuario-cartola/listar-times-usuario-cartola.component';
import { RodadaCartolaComponent } from '../rodada-cartola/rodada-cartola.component';
import { CadastrarRodadaCartolaComponent } from '../rodada-cartola/cadastrar-rodada-cartola/cadastrar-rodada-cartola.component';
import { ModalAddTimeRodadaComponent } from '../modal/modal-add-time-rodada/modal-add-time-rodada.component';
import { ListarMeusJogosMeusPagamentosComponent } from '../listar-meusjogos-meuspagamentos/listar-meusjogos-meuspagamentos.component';
import { ModalMeusTimesComponent } from '../modal/modal-meus-times/modal-meus-times.component';
import { ListarPendenciaPagamentoComponent } from '../listar-pendencia-pagamento/listar-pendencia-pagamento.component';
import { ListarUsuariosComponent } from '../listar-usuarios/listar-usuarios.component';
import { PerfilUsuarioComponent } from '../perfil-usuario/perfil-usuario.component';
import { LoginGloboComponent } from '../login-globo/login-globo.component';
import { AtribuirNovaSenhaUsuarioComponent } from '../modal/atribuir-nova-senha-usuario/atribuir-nova-senha-usuario.component';


const homeRoutes = [

    {
        path: ''
        , component: HomeComponent
        , canActivate: [AuthGuard]
        , children: [
            {
                path: 'inicio',
                component: InicioComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
          //      loadChildren: '../../app/inicio/inicio.module#InicioModule'
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },
            {
                path: 'timeCartola',
                component: ListarTimesCartolaComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },
            {
                path: 'consultaTimeCartola',
                component: ConsultaTimeCartolaComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },
            {
                path: 'listarTimesUsuarioCartola',
                component: ListarTimesUsuarioCartolaComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },
            {
                path: 'rodadaCartola',
                component: RodadaCartolaComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },
            {
                path: 'cadastrarRodadaCartola',
                component: CadastrarRodadaCartolaComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },

            {
                path: 'modalAddTimeRodada',
                component: ModalAddTimeRodadaComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },

            {
                path: 'modalMeusTimes',
                component: ModalMeusTimesComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },

            {
                path: 'modalAtribuirNovaSenhaUsuario',
                component: AtribuirNovaSenhaUsuarioComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },

            {
                path: 'meusJogosMeusPagamentos',
                component: ListarMeusJogosMeusPagamentosComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },

            {
                path: 'listarPendenciaPagamento',
                component: ListarPendenciaPagamentoComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },

            {
                path: 'listarUsuarios',
                component: ListarUsuariosComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },

            {
                path: 'perfilUsuario',
                component: PerfilUsuarioComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },

            {
                path: 'loginGlobo',
                component: LoginGloboComponent,
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },

        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes),
    ],
    exports: [RouterModule],
})
export class HomeRoutingModule { }
