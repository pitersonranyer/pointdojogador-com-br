import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilService } from '../../services/util.service';
import { UsuarioEntity } from '../../../entities/usuario.entity';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private router: Router,
        private utilService: UtilService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.verificarAutenticacao(state)) {
            switch (state.url) {

                case '/':
                    this.router.navigate(['/inicio']);
                    return true;
                case '/inicio':
                case '/usuario':
                case '/exercicio':
                case '/modelo-treino':
                case '/aluno':
                case '/musculo':
                case '/equipamento':
                case '/instrutor':
                    return true;
                default:
                    this.router.navigate(['/acesso-negado']);
                    return false;
            }
        } else {
            return false;
        }
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        return this.verificarAutenticacao('');
    }

    verificarAcessoUnidade() {
        if (this.utilService.getUsuarioAutenticado().acesso.indexOf('ROLE_U01') === -1
            && this.utilService.getUsuarioAutenticado().acesso.indexOf('ROLE_U02') === -1) {
            this.router.navigate(['/acesso-negado']);
            return false;
        }
        return true;
    }

    verificarAcessoConfiguracao() {
        if (this.utilService.getUsuarioAutenticado().acesso.indexOf('ROLE_A01') === -1) {
            this.router.navigate(['/acesso-negado']);
            return false;
        }
        return true;
    }

    verificarAutenticacao(state) {
        // btoa = encriptografa na base 64
        if (sessionStorage.getItem(btoa('tokenAuth'))) {
            // Usuário logado
            this.utilService.setUsuarioAutenticado(new UsuarioEntity());
            this.utilService.setUsuarioAutenticado(JSON.parse(atob(sessionStorage.getItem(btoa('userAuth')))));
            return true;
        }

        // Usuário não logado então redireciona para a tela de login
        sessionStorage.removeItem(btoa('tokenAuth'));
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

        return false;
    }
}
