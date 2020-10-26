import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartolaAPIService } from '../services/cartola-api.service';
import { RodadaCartola } from '../interfaces/rodadaCartola';
import { ModalAddTimeRodadaComponent } from '../modal/modal-add-time-rodada/modal-add-time-rodada.component';

import { TimeRodadaCartola } from '../interfaces/timeRodadaCartola';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { MensageriaService } from '../services/mensageria.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('htmlData') htmlData: ElementRef;

  anoAtual = 2020;


  public totalParticipantes = 0;
  public premiacaoTotal = 0;
  public premiacaoPercentual = 0;
  public premiacaoFinal = 0;
  public premiacaoFinalFormat = '';

  parciais = [];

  public timeRodadaCartola: TimeRodadaCartola = <TimeRodadaCartola>{};
  arrayAtletasPontuados = [];
  totPontos: number;
  pontuacaoParcial: number;
  capitao_id: number;

  usuario$: Observable<Usuario>;
  usuario: Usuario;

  dataFim: string;
  horaFim: string;

  count: number;
  atletas: Array<any> = [];

  public rodadas = [];

  constructor(private router: Router,
    private listarRodadaAtual: CartolaAPIService,
    private countRodadaAtual: CartolaAPIService,
    private listarTodasRodadaCartolaAtivas: CartolaAPIService,
    public usuarioService: UsuarioService,
    public mensageria: MensageriaService
  ) {

    this.usuario$ = usuarioService.getUsuario();
    this.usuario$.subscribe(usuario => this.usuario = usuario);

  }

  ngOnInit() {
    this.mensageria.processamento = true;
    this.listarRodadaCartolaAtivas();
    this.mensageria.processamento = false;
  }

  addTimeRodada(rodada: RodadaCartola): void {
    this.router.navigate(['/listarAddTimeRodada'], { queryParams: rodada });
  }


  listarRodadaCartolaAtivas() {
    this.listarTodasRodadaCartolaAtivas.listarTodasRodadaCartolaAtivas().subscribe((rodadasCartola: RodadaCartola[]) => {
      this.rodadas = rodadasCartola;

      for (let i = 0; i < this.rodadas.length; i++) {
        this.count = 0;
        this.countRodadaAtual.consultaTimeRodadaCartolaCount(this.rodadas[i].anoTemporada, this.rodadas[i].idRodada)
          .subscribe((count: number) => {
            this.rodadas[i].totalParticipantes = count;
            this.premiacaoTotal = this.rodadas[i].totalParticipantes * this.rodadas[i].valorRodada;
            this.premiacaoPercentual = (this.premiacaoTotal * 10) / 100;
            this.premiacaoFinal = this.premiacaoTotal - this.premiacaoPercentual;

            this.rodadas[i].premiacaoFinalFormat = this.premiacaoFinal.toLocaleString('pt-br', { minimumFractionDigits: 2 });
            this.rodadas[i].dataFim = this.rodadas[i].dtFimInscricao.substring(0, 5);
            this.rodadas[i].horaFim = this.rodadas[i].hrFimInscricao.substring(0, 5);

          });
      }
    });
  }


}

