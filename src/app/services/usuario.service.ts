import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { Usuario } from '../interfaces/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private _usuario: BehaviorSubject<Usuario>;
  public readonly usuario$: Observable<Usuario>;

  constructor(private http: HttpClient) {
    this._usuario = new BehaviorSubject({} as Usuario);
    this.usuario$ = this._usuario.asObservable();
  }

  setUsuario(usuario: Usuario) {
    this._usuario.next(usuario);
  }

  getUsuario() {
    return this._usuario.asObservable();
  }

  cadastrar(usuario: Usuario) {
    const url = `${environment.pointdojogadorApiUrl}/usuarios`;
    return this.http.post(url, usuario);
  }

  alterarDadosUsuario(usuario: Usuario): Observable<Usuario> {
    const url = `${environment.pointdojogadorApiUrl}/usuarioComum/atualizar`;
    return this.http.put<Usuario>(url, usuario);
  }

  consutaUsuarioPorId(id: number): Observable<Usuario> {
    const url = `${environment.pointdojogadorApiUrl}/usuarioComum/${id}`;
    return this.http.get<Usuario>(url);
  }

  listarUsuarios(): Observable<Usuario[]> {
    const url = `${environment.pointdojogadorApiUrl}/usuarioComum/todos`;
    return this.http.get<Usuario[]>(url);
  }

}
