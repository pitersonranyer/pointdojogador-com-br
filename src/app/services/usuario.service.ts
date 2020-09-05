import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { UsuarioEntity } from '../../entities/usuario.entity';


@Injectable()
export class UsuarioService {

    constructor(private http: HttpClient,
        private utilService: UtilService) { }

    private url = this.utilService.getUrlBackend() + 'usuario';

    /**
     * @description atualização de usuário
     * @returns UsuarioModel Usuário atualizado
     */
    public put(usuario: UsuarioEntity) {
        return this.http.put(this.url, usuario);
    }

    /**
     * @description Selecionar todos os usuário cadastrados com paginação (5 registros por páginas)
     * @param pagina Página da pesquisa
     * @returns UsuarioModel[] Lista de todos os usuários cadastrados no sistema a partir da página
     */
    public getAll(pagina) {
        let params = new HttpParams();
        params = params.append('page', pagina);
        return this.http.get(this.url, { params: params });
    }

    /**
     * @description Selecionar dados do usuario a partir do login
     * @returns UsuarioModel
     */
    public getByLogin(login: string) {
        const url = this.url + '/login';
        let params = new HttpParams();
        params = params.append('login', login);
        return this.http.get(url, { params: params });
    }

    /**
     * @description Selecionar dados do usuario a partir do login
     * @returns UsuarioModel
     */
    public isUsuarioExistente(login: string) {
        const url = this.url + '/isUsuarioExistente/' + login;
        return this.http.get(url);
    }

    /**
     * @description Selecionar dados do usuario a partir do login (parcial ou total)
     * @returns UsuarioModel[]
     */
    public getByLoginContaining(login, pagina) {
        const url = this.url + '/parte-login';
        let params = new HttpParams();
        params = params.append('login', login);
        params = params.append('pagina', pagina);
        return this.http.get(url, { params: params });
    }



}
