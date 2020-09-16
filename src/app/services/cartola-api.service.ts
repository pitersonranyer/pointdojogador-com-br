import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { TimeCartola } from '../interfaces/timeCartola';
import { RodadaCartola } from '../interfaces/rodadaCartola';
import { TimeRodadaCartola } from '../interfaces/timeRodadaCartola';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class CartolaAPIService {

  constructor(private http: HttpClient, private utilService: UtilService) { }

  private _listners = new Subject<any>();

  loginCartola(userCartola: string, senhaCartola: string): any {
    const loginSenhaCartola = {
      login: userCartola.toLowerCase(),
      senha: senhaCartola
    };
    const url = this.utilService.getUrlBackend() + '/cartolaAPI/loginCartola';
   // const url = `${environment.pointdojogadorApiUrl}/cartolaAPI/loginCartola`;
    return this.http.post<any>(url, loginSenhaCartola);
  }

  buscarTimeUsuarioLogado(glbId: string): Observable<any> {
    const url = this.utilService.getUrlBackend() + `/cartolaAPI/buscarTimeUsuarioLogado/${glbId}`;
    // const url = `${environment.pointdojogadorApiUrl}/cartolaAPI/buscarTimeUsuarioLogado/${glbId}`;
    return this.http.get<any>(url);
  }

  listarTimesCartola(time: string): Observable<TimeCartola[]> {
    const url = this.utilService.getUrlBackend() + `/cartolaAPI/listarTimesCartola/${time}`;
   // const url = `${environment.pointdojogadorApiUrl}/cartolaAPI/listarTimesCartola/${time}`;
    return this.http.get<TimeCartola[]>(url);
  }

  consultarTimeCartola(Idtime: number): Observable<any> {
    const url = this.utilService.getUrlBackend() + `/cartolaAPI/consultarTimeCartola/${Idtime}`;
  //  const url = `${environment.pointdojogadorApiUrl}/cartolaAPI/consultarTimeCartola/${Idtime}`;
    return this.http.get<any>(url);
  }

  listarAtletasPontuados(): Observable<any> {
    const url = this.utilService.getUrlBackend() + `/cartolaAPI/listarAtletasPontuados`;
   // const url = `${environment.pointdojogadorApiUrl}/cartolaAPI/listarAtletasPontuados`;
    return this.http.get<any>(url);
  }


  // endpoints de persistencias MYSQL.

  // -- TimesUsuarioCartola
  cadastrarTimeUsuarioCartola(timeCartola: TimeCartola) {
    const url = this.utilService.getUrlBackend() + `/timeUsuarioCartola`;
  //  const url = `${environment.pointdojogadorApiUrl}/timeUsuarioCartola`;
    return this.http.post(url, timeCartola);
  }

  listarTimesUsuarioCartola(id: number): Observable<TimeCartola[]> {
    const url = this.utilService.getUrlBackend() + `/timeUsuarioCartola/listarTimesUsuarioCartola/${id}`;
   // const url = `${environment.pointdojogadorApiUrl}/timeUsuarioCartola/listarTimesUsuarioCartola/${id}`;
    return this.http.get<TimeCartola[]>(url);
  }

  deletaTimeUsuarioCartola(idUsuario: number, time_id: number) {
    const url = this.utilService.getUrlBackend() + `/timeUsuarioCartola/excluirTimeUsuarioCartola/${idUsuario}/${time_id}`;
  // const url = `${environment.pointdojogadorApiUrl}/timeUsuarioCartola/excluirTimeUsuarioCartola/${idUsuario}/${time_id}`;
    return this.http.delete(url);
  }

  // -- RodadaCartola

  cadastrarRodadaCartola(rodadaCartola: RodadaCartola) {
    const url = this.utilService.getUrlBackend() + `/rodadaCartola`;
    // const url = `${environment.pointdojogadorApiUrl}/rodadaCartola`;
    return this.http.post(url, rodadaCartola);
  }


  listarTodasRodadaCartola(): Observable<RodadaCartola[]> {
    const url = this.utilService.getUrlBackend() + `/rodadaCartola/listarTodasRodadaCartola`;
    // const url = `${environment.pointdojogadorApiUrl}/rodadaCartola/listarTodasRodadaCartola`;
    return this.http.get<RodadaCartola[]>(url);
  }

  listarRodadaCartolaPorId(anoTemporada: number, idRodada: number): Observable<RodadaCartola> {
    const url = this.utilService.getUrlBackend() + `/rodadaCartola/listarTodasRodadaCartola`;
  // const url = `${environment.pointdojogadorApiUrl}/rodadaCartola/listarRodadaCartolaPorId/${anoTemporada}/${idRodada}`;
    return this.http.get<RodadaCartola>(url);
  }

  listarRodadaCartolaPorTemporada(anoTemporada: number): Observable<RodadaCartola> {
    const url = this.utilService.getUrlBackend() + `/rodadaCartola/listarRodadaCartolaTemporada/${anoTemporada}`;
    console.log(url); 
   // const url = `${environment.pointdojogadorApiUrl}/rodadaCartola/listarRodadaCartolaTemporada/${anoTemporada}`;
    return this.http.get<RodadaCartola>(url);
  }

  excluirRodadaCartolaPorId(anoTemporada: number, idRodada: number) {
    const url = this.utilService.getUrlBackend() + `/rodadaCartola/excluirRodadaCartolaPorId/${anoTemporada}/${idRodada}`;
    // const url = `${environment.pointdojogadorApiUrl}/rodadaCartola/excluirRodadaCartolaPorId/${anoTemporada}/${idRodada}`;
    return this.http.delete(url);
  }


  // -- TimeRodadaCartola
  cadastrarTimeRodadaCartola(rodadaCartola: TimeRodadaCartola) {
    const url = this.utilService.getUrlBackend() + `/timeRodadaCartola`;
   // const url = `${environment.pointdojogadorApiUrl}/timeRodadaCartola`;
    return this.http.post(url, rodadaCartola);
  }

  // lista times do usuario, vinculado ou não a rodada
  listarTimesUsuarioCartolaRodada(anoTemporada: number, idUsuario: number, idRodada: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() 
    + `/timeUsuarioCartola/listarTimesUsuarioCartolaRodada/${anoTemporada}/${idUsuario}/${idRodada}`;

    // const url = `${environment.pointdojogadorApiUrl}`
    //  + `/timeUsuarioCartola/listarTimesUsuarioCartolaRodada/${anoTemporada}/${idUsuario}/${idRodada}`;
    return this.http.get<any[]>(url);
  }

  // -- Count de inscritos ** Pagos
  consultaTimeRodadaCartolaCount(anoTemporada: number, idRodada: number) {
    const url = this.utilService.getUrlBackend() + `/timeRodadaCartola/consultaTimeRodadaCartolaCount/${anoTemporada}/${idRodada}`;
    // const url = `${environment.pointdojogadorApiUrl}/timeRodadaCartola/consultaTimeRodadaCartolaCount/${anoTemporada}/${idRodada}`;
    return this.http.get(url);
  }

  // -- Meus Jogos Meus Pagamentos
  listaMeusJogosMeusPgtos(idUsuario: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/timeRodadaCartola/listaMeusJogosMeusPgtos/${idUsuario}`;
//    const url = `${environment.pointdojogadorApiUrl}/timeRodadaCartola/listaMeusJogosMeusPgtos/${idUsuario}`;
    return this.http.get<any[]>(url);
  }


  // -- Resultado parcial
  listaResutaldoParcialRodada(anoTemporada: number, idRodada: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/timeRodadaCartola/listaTimeRodadaCartolaPorRodada/${anoTemporada}/${idRodada}`;
    // const url = `${environment.pointdojogadorApiUrl}/timeRodadaCartola/listaTimeRodadaCartolaPorRodada/${anoTemporada}/${idRodada}`;
    return this.http.get<any[]>(url);
  }

  // -- Atualizar Resultado parcial
  atualizarPontosRodadaCartola(timeRodadaCartola: TimeRodadaCartola) {
    const url = this.utilService.getUrlBackend() + `/timeRodadaCartola/atualizarPontosRodadaCartola`;
    // const url = `${environment.pointdojogadorApiUrl}/timeRodadaCartola/atualizarPontosRodadaCartola`;
    return this.http.put(url, timeRodadaCartola);
  }


  // Lista de Time Pendente de Pagamento
  listaTimeRodadaPendentePgto(anoTemporada: number, idRodada: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/timeRodadaCartola/listaTimeRodadaPendentePgto/${anoTemporada}/${idRodada}`;
    // const url = `${environment.pointdojogadorApiUrl}/timeRodadaCartola/listaTimeRodadaPendentePgto/${anoTemporada}/${idRodada}`;
    return this.http.get<any[]>(url);
  }

  atualizarStatusPagamento(timeRodadaCartola: TimeRodadaCartola) {
    const url = this.utilService.getUrlBackend() + `/timeRodadaCartola/atualizarStatusPagamento`;
    // const url = `${environment.pointdojogadorApiUrl}/timeRodadaCartola/atualizarStatusPagamento`;
    return this.http.put(url, timeRodadaCartola);
  }

  // Lista de Time Pendente de Pagamento
  listarTimesUsuarioRodada(anoTemporada: number, idRodada: number, idUsuario: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() +
     `/timeRodadaCartola/listaTimeRodadaCartolaPorId/${anoTemporada}/${idRodada}/${idUsuario}`;
   // const url = `${environment.pointdojogadorApiUrl}` +
   //   `/timeRodadaCartola/listaTimeRodadaCartolaPorId/${anoTemporada}/${idRodada}/${idUsuario}`;
    return this.http.get<any[]>(url);
  }

  atualizarStatusRodada(rodadaCartola: RodadaCartola) {
    const url = this.utilService.getUrlBackend() + `/rodadaCartola/alterarStatusRodada`;
    // const url = `${environment.pointdojogadorApiUrl}/rodadaCartola/alterarStatusRodada`;
    return this.http.put(url, rodadaCartola);
  }


  listen(): Observable<any> {
    return this._listners.asObservable();
  }
  filtro(filtrarPor: string) {
    this._listners.next(filtrarPor);
  }





}
