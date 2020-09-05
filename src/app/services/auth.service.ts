import { MensageriaService } from './mensageria.service';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { UtilService } from './util.service';
import { DOCUMENT } from '@angular/platform-browser';

/**
 * @author Felipe Lima
 * @description Seviço de autenticação do usuário no backend e tratamento do status da sessão
 */

@Injectable()
export class AuthService {
    constructor(private http: HttpClient,
        private router: Router,
        private util: UtilService,
        private mensageriaService: MensageriaService,
        @Inject(DOCUMENT) private document: Document) { }

    /**
     * @description Realiza login junto ao backend
     * @param username Usuário para autenticação
     * @param password Senha do usuário para autenticação
     * @returns token de autenticação
     */
    login(username: string, password: string): any {
        const loginSenha = {
            login: username.toLowerCase(),
            senha: password
        };
        const url = this.util.getUrlBackend() + 'auth';
        return this.http.post<any>(url, loginSenha);
    }

    /**
     * @description Remove o token de autenticalção da sessão e redireciona para a tela de login
     * @returns void
     */
    logout(): void {

        // Remove token de autenticação
        // btoa = encritografa na base 64
        sessionStorage.removeItem(btoa('tokenAuth'));


        // Encaminha para a tela de login
        this.router.navigate(['login']);

        this.mensageriaService.processamento = false;

        this.mensageriaService.quantidadeRecadosNovos = 0;

        this.mensageriaService.novidade = true;
    }

    /**
     * @description Verifica se token enviado foi validado com sucesso pelo backend(não está expirado)
     * @param codigoErro status retornado no erro
     * @returns true(validação ok), false(validação falhou e o usuário é redirecionado para fazer o login novamente)
     */
    validarToken(codigoErro): boolean {
        this.mensageriaService.processamento = false;
        switch (codigoErro) {
            case 401:
                this.mensageriaService.setMensagemAlerta(false, true, 'Sua sessão expirou. Faça o login novamente.');
                this.tratarRedirecionamento();
                return false;
            case 0:
                this.mensageriaService.setMensagemErroConexao();
                return false;
            default:
                return true;
        }
    }

    /**
     * @description Tratamento de erro no retorno da comunicação com o backend
     */
    tratarErro(error: any) {
        if (this.validarToken(error['status'])) {
            this.mensageriaService.setMensagemErro(true, true, 'ERRO', error['error'].message);
            this.mensageriaService.processamento = false;
        }
    }

    /**
     * @description Trata redirecionamento para tela de login em caso de erro de sessão expirada e de backend indisponível.
     * @returns void
     */
    private tratarRedirecionamento(): void {
        sessionStorage.removeItem(btoa('tokenAuth'));
        this.router.navigate(['/login']);
    }
}
