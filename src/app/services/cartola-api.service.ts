import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { retry } from 'rxjs/operators';
import { PontuacaoTimeRodada } from 'src/app/interfaces/pontuacaoTimeRodada';
import { BilheteCompeticaoCartola } from '../interfaces/bilheteCompeticaoCartola';
import { CompeticaoCartola } from '../interfaces/competicaoCartola';
import { HistoricoTimeUsuario } from '../interfaces/historicoTimeUsuario';
import { Liga } from '../interfaces/liga';
import { RodadaCartola } from '../interfaces/rodadaCartola';
import { TimeBilheteCompeticaoCartola } from '../interfaces/timeBilheteCompeticaoCartola';
import { TimeCartola } from '../interfaces/timeCartola';
import { TimeLigaCartola } from '../interfaces/timeLigaCartola';
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
    return this.http.post<any>(url, loginSenhaCartola);
  }

  buscarTimeUsuarioLogado(glbId: string): Observable<any> {
    const url = this.utilService.getUrlBackend() + `/cartolaAPI/buscarTimeUsuarioLogado/${glbId}`;
    return this.http.get<any>(url);
  }

  listarTimesCartola(time: string): Observable<TimeCartola[]> {
    const url = this.utilService.getUrlBackend() + `/cartolaAPI/listarTimesCartola/${time}`;
    return this.http.get<TimeCartola[]>(url);
  }

  consultarTimeCartola(Idtime: number): Observable<any> {
    const url = this.utilService.getUrlBackend() + `/cartolaAPI/consultarTimeCartola/${Idtime}`;
    return this.http.get<any>(url)
      .pipe(
        retry(3));
  }

  consultarTimeInfoCartolaById(Idtime: number): Observable<any> {
    const url = this.utilService.getUrlBackend() + `/cartolaAPI/consultarTimeInfoCartolaById/${Idtime}`;
    return this.http.get<any>(url);
  }

  listarAtletasPontuados(): Observable<any> {
    const url = this.utilService.getUrlBackend() + `/cartolaAPI/listarAtletasPontuados`;
    return this.http.get<any>(url)
    .pipe(
      retry(3));
  }

  

  consultarMercadoStatus(): Observable<any> {
    const url = this.utilService.getUrlBackend() + `/cartolaAPI/consultarMercadoStatus`;
    return this.http.get<any>(url);
  }


  consultarBancoDeReservas(time_id: number, nrRodada: number): Observable<any> {
    const url = this.utilService.getUrlBackend() + `/cartolaAPI/consultarBancoDeReservas/${time_id}/${nrRodada}`;
    return this.http.get<any>(url);
  }


  // endpoints de persistencias MYSQL.

  // -- TimesUsuarioCartola
  cadastrarTimeUsuarioCartola(timeCartola: TimeCartola) {
    const url = this.utilService.getUrlBackend() + `/timeUsuarioCartola`;
    return this.http.post(url, timeCartola);
  }

  listarTimesUsuarioCartola(id: number): Observable<TimeCartola[]> {
    const url = this.utilService.getUrlBackend() + `/timeUsuarioCartola/listarTimesUsuarioCartola/${id}`;
    return this.http.get<TimeCartola[]>(url);
  }

  deletaTimeUsuarioCartola(idUsuario: number, time_id: number) {
    const url = this.utilService.getUrlBackend() + `/timeUsuarioCartola/excluirTimeUsuarioCartola/${idUsuario}/${time_id}`;
    return this.http.delete(url);
  }

  // -- RodadaCartola

  cadastrarRodadaCartola(rodadaCartola: RodadaCartola) {
    const url = this.utilService.getUrlBackend() + `/rodadaCartola`;
    return this.http.post(url, rodadaCartola);
  }


  listarTodasRodadaCartola(): Observable<RodadaCartola[]> {
    const url = this.utilService.getUrlBackend() + `/rodadaCartola/listarTodasRodadaCartola`;
    return this.http.get<RodadaCartola[]>(url);
  }

  listarTodasRodadaCartolaAtivas(): Observable<RodadaCartola[]> {
    const url = this.utilService.getUrlBackend() + `/rodadaCartola/listarRodadaCartolaAtivas`;
    return this.http.get<RodadaCartola[]>(url);
  }

  listarRodadaCartolaPorId(anoTemporada: number, idRodada: number): Observable<RodadaCartola> {
    const url = this.utilService.getUrlBackend() + `/rodadaCartola/listarRodadaCartolaPorId/${anoTemporada}/${idRodada}`;
    return this.http.get<RodadaCartola>(url);
  }

  listarRodadaCartolaPorTemporada(anoTemporada: number): Observable<RodadaCartola> {
    const url = this.utilService.getUrlBackend() + `/rodadaCartola/listarRodadaCartolaTemporada/${anoTemporada}`;
    return this.http.get<RodadaCartola>(url);
  }

  excluirRodadaCartolaPorId(anoTemporada: number, idRodada: number) {
    const url = this.utilService.getUrlBackend() + `/rodadaCartola/excluirRodadaCartolaPorId/${anoTemporada}/${idRodada}`;
    return this.http.delete(url);
  }


  // -- TimeRodadaCartola
  cadastrarTimeRodadaCartola(rodadaCartola: TimeRodadaCartola) {
    const url = this.utilService.getUrlBackend() + `/timeRodadaCartola`;
    return this.http.post(url, rodadaCartola);
  }

  // lista times do usuario, vinculado ou não a rodada
  listarTimesUsuarioCartolaRodada(anoTemporada: number, idUsuario: number, idRodada: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend()
      + `/timeUsuarioCartola/listarTimesUsuarioCartolaRodada/${anoTemporada}/${idUsuario}/${idRodada}`;
    return this.http.get<any[]>(url);
  }

  // -- Count de inscritos ** Pagos
  consultaTimeRodadaCartolaCount(anoTemporada: number, idRodada: number) {
    const url = this.utilService.getUrlBackend() + `/timeRodadaCartola/consultaTimeRodadaCartolaCount/${anoTemporada}/${idRodada}`;
    return this.http.get(url);
  }

  // -- Meus Jogos Meus Pagamentos
  listaMeusJogosMeusPgtos(idUsuario: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/timeRodadaCartola/listaMeusJogosMeusPgtos/${idUsuario}`;
    return this.http.get<any[]>(url);
  }


  // -- Resultado parcial
  listaResutaldoParcialRodada(anoTemporada: number, idRodada: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/timeRodadaCartola/listaTimeRodadaCartolaPorRodada/${anoTemporada}/${idRodada}`;
    return this.http.get<any[]>(url);
  }

  // -- Atualizar Resultado parcial
  atualizarPontosRodadaCartola(timeRodadaCartola: TimeRodadaCartola) {
    const url = this.utilService.getUrlBackend() + `/timeRodadaCartola/atualizarPontosRodadaCartola`;
    return this.http.put(url, timeRodadaCartola);
  }

  


  // Lista de Time Pendente de Pagamento
  listaTimeRodadaPendentePgto(anoTemporada: number, idRodada: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/timeRodadaCartola/listaTimeRodadaPendentePgto/${anoTemporada}/${idRodada}`;
    return this.http.get<any[]>(url);
  }

  atualizarStatusPagamento(timeRodadaCartola: TimeRodadaCartola) {
    const url = this.utilService.getUrlBackend() + `/timeRodadaCartola/atualizarStatusPagamento`;
    return this.http.put(url, timeRodadaCartola);
  }

  // Lista de Time Pendente de Pagamento
  listarTimesUsuarioRodada(anoTemporada: number, idRodada: number, idUsuario: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() +
      `/timeRodadaCartola/listaTimeRodadaCartolaPorId/${anoTemporada}/${idRodada}/${idUsuario}`;
    return this.http.get<any[]>(url);
  }

  // cancelar inscrição time
  cancelarInscricaoTime(anoTemporada: number, idRodada: number, idUsuario: number, time_id: number) {
    const url = this.utilService.getUrlBackend() +
      `/timeRodadaCartola/cancelarInscricaoTime/${anoTemporada}/${idRodada}/${idUsuario}/${time_id}`;
    return this.http.delete(url);
  }

  atualizarStatusRodada(rodadaCartola: RodadaCartola) {
    const url = this.utilService.getUrlBackend() + `/rodadaCartola/alterarStatusRodada`;
    return this.http.put(url, rodadaCartola);
  }

  // GERENCIA LIGAS
  listarLigasAdms(idUsuarioAdmLiga: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend()
      + `/liga/listarLigasAdms/${idUsuarioAdmLiga}`;
    return this.http.get<any[]>(url);
  }

  // GERENCIA LIGAS
  cadastrarLiga(liga: Liga) {
    const url = this.utilService.getUrlBackend() + `/liga`;
    return this.http.post(url, liga);
  }

  excluirLiga(anoTemporada: number, idRodada: number, idUsuarioAdmLiga: number, idLiga: number) {
    const url = this.utilService.getUrlBackend() + `/liga/excluirLiga/${anoTemporada}/${idRodada}/${idUsuarioAdmLiga}/${idLiga}`;
    return this.http.delete(url);
  }


  listarTimeLigaPorRodada(anoTemporada: number, idRodada: number, idUsuarioAdmLiga: number, idLiga: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() +
      `/timeLiga/listarTimeLigaPorRodada/${anoTemporada}/${idRodada}/${idUsuarioAdmLiga}/${idLiga}`;
    return this.http.get<any[]>(url);
  }


  cadastrarTimesLiga(timeLiga: TimeLigaCartola) {
    const url = this.utilService.getUrlBackend() + `/timeLiga`;
    return this.http.post(url, timeLiga);
  }

  listen(): Observable<any> {
    return this._listners.asObservable();
  }
  filtro(filtrarPor: string) {
    this._listners.next(filtrarPor);
  }

  consultarUsuario(id: number) {
    const url = this.utilService.getUrlBackend() + `/usuarioComum/${id}`;
    return this.http.get(url);
  }


  // COMPETICAO CARTOLA

  cadastrarCompeticaoCartola(competicaoCartola: CompeticaoCartola) {
    const url = this.utilService.getUrlBackend() + `/competicaoCartola`;
    return this.http.post(url, competicaoCartola);
  }

  listarCompeticaoCartolaAtivas(): Observable<CompeticaoCartola[]> {
    const url = this.utilService.getUrlBackend() + `/competicaoCartola/listarCompeticaoCartolaAtivas`;
    return this.http.get<CompeticaoCartola[]>(url);
  }

  listarCompeticaoCartolaAtivasId(idUsuarioAdmLiga: number) {
    const url = this.utilService.getUrlBackend() + `/competicaoCartola/listarCompeticaoCartolaAtivasId/${idUsuarioAdmLiga}`;
    return this.http.get(url);
  }

  alterarCompeticaoCartola(competicaoCartola: CompeticaoCartola) {
    const url = this.utilService.getUrlBackend() + `/competicaoCartola/alterarCompeticaoCartola`;
    return this.http.put(url, competicaoCartola);
  }

  excluirCompeticaoCartolaPorId(nrSequencialRodadaCartola: number) {
    const url = this.utilService.getUrlBackend() + `/competicaoCartola/excluirCompeticaoCartolaPorId/${nrSequencialRodadaCartola}`;
    return this.http.delete(url);
  }

  listarHistoricoTimesUsuario(nrContatoUsuario: string) {
    const url = this.utilService.getUrlBackend() + `/historicoTimeUsuario/listarTimesUsuario/${nrContatoUsuario}`;
    return this.http.get(url);
  }

  excluirHistoricoTimeUsuario(time_id: number) {
    const url = this.utilService.getUrlBackend() + `/historicoTimeUsuario/excluirTimeUsuario/${time_id}`;
    return this.http.delete(url);
  }

  cadastrarHistoricoTimeUsuario(historicoTimeUsuario: HistoricoTimeUsuario) {
    const url = this.utilService.getUrlBackend() + `/historicoTimeUsuario`;
    return this.http.post(url, historicoTimeUsuario);
  }


  gerarBilheteCompeticaoCartola(bilhete: BilheteCompeticaoCartola) {
    const url = this.utilService.getUrlBackend() + `/bilheteCompeticaoCartola`;
    return this.http.post(url, bilhete);
  }

  gerarBilheteCompeticaoCartolaPorIds(bilhete: any[]) {
    const url = this.utilService.getUrlBackend() + `/bilheteCompeticaoCartola/cadastroPorId`;
    return this.http.post(url, bilhete);
  }

  listarTimeBilheteGerado(nrContatoUsuario: number, nrSequencialRodadaCartola: number): Observable<any> {
    const url = this.utilService.getUrlBackend() + `/timeBilheteCompeticaoCartola/listarTimeBilheteGerado/${nrContatoUsuario}/${nrSequencialRodadaCartola}`;
    return this.http.get<any>(url);
  }

  cadastrarTimeBilheteCompeticaoCartola(timebilhete: TimeBilheteCompeticaoCartola) {
    const url = this.utilService.getUrlBackend() + `/timeBilheteCompeticaoCartola`;
    return this.http.post(url, timebilhete);
  }

  excluirTimeBilhete(idBilhete: number, time_id: number) {
    const url = this.utilService.getUrlBackend() + `/timeBilheteCompeticaoCartola/excluirTimeBilhete/${idBilhete}/${time_id}`;
    return this.http.delete(url);
  }

  excluirBilhete(idBilhete: number) {
    const url = this.utilService.getUrlBackend() + `/bilheteCompeticaoCartola/excluirBilhete/${idBilhete}`;
    return this.http.delete(url);
  }


  listarBilheteGerado(): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/bilheteCompeticaoCartola/listarBilheteGerado`;
    return this.http.get<any[]>(url);
  }


  listarBilheteGeradoId(idUsuarioAdmLiga: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/bilheteCompeticaoCartola/listarBilheteGeradoId/${idUsuarioAdmLiga}`;
    return this.http.get<any[]>(url);
  }

  listarTimesDaCompeticao(nrSequencialRodadaCartola: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/timeBilheteCompeticaoCartola/listarTimesDaCompeticao/${nrSequencialRodadaCartola}`;
    return this.http.get<any[]>(url)
  }

  consultaTimeCompeticaoCount(nrSequencialRodadaCartola: number) {
    const url = this.utilService.getUrlBackend() + `/timeBilheteCompeticaoCartola/consultaTimeCompeticaoCount/${nrSequencialRodadaCartola}`;
    return this.http.get(url);
  }

  alterarStatusBilhete(bilhete: BilheteCompeticaoCartola) {
    const url = this.utilService.getUrlBackend() + `/bilheteCompeticaoCartola/alterarStatusBilhete`;
    return this.http.put(url, bilhete);
  }


  consultarTimeBilhetePorCodigo(codigoBilhete: string) {
    const url = this.utilService.getUrlBackend() + `/timeBilheteCompeticaoCartola/consultarTimeBilhetePorCodigo/${codigoBilhete}`;
    return this.http.get(url);
  }

  // -- Atualizar Resultado parcial TIME BILHETE
  atualizarPontosTimeBilhete(timeBilhete: TimeBilheteCompeticaoCartola) {
    const url = this.utilService.getUrlBackend() + `/timeBilheteCompeticaoCartola/atualizarPontosTimeBilhete`;
    return this.http.put(url, timeBilhete);
  }


  atualizarPontuacaoTimeRodada(pontuacaoTimeRodada: PontuacaoTimeRodada) {
    const url = this.utilService.getUrlBackend() + `/pontuacaoTimeRodada`;
    return this.http.post(url, pontuacaoTimeRodada);
  }


  atualizarParciais(nrSequencialRodadaCartola: number) {
    const url = this.utilService.getUrlBackend() + `/atualizarParciais/atualizarParciais/${nrSequencialRodadaCartola}`;
    return this.http.get(url);
  }


}
