import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartolaAPIService } from '../services/cartola-api.service';
import { RodadaCartola } from '../interfaces/rodadaCartola';
import { ModalAddTimeRodadaComponent } from '../modal/modal-add-time-rodada/modal-add-time-rodada.component';

import { DialogService } from 'primeng/api';
import { TimeRodadaCartola } from '../interfaces/timeRodadaCartola';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { MensageriaService } from '../services/mensageria.service';
import { TimeCartola } from '../interfaces/timeCartola';
import { ModalDetalheTimeUsuarioComponent } from '../modal/detalhe-time-usuario/modal-detalhe-time-usuario.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  anoAtual = 2020;

  public rodada: RodadaCartola;
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

  constructor(private router: Router,
    private listarRodadaAtual: CartolaAPIService,
    private countRodadaAtual: CartolaAPIService,
    private listaResultadoParcialRodada: CartolaAPIService,
    private atualizarResultadoParcial: CartolaAPIService,
    private consultarTimeCartola: CartolaAPIService,
    private atletasPontuados: CartolaAPIService,
    private dialogService: DialogService,
    public usuarioService: UsuarioService,
    public mensageria: MensageriaService
  ) {

    this.usuario$ = usuarioService.getUsuario();
    this.usuario$.subscribe(usuario => this.usuario = usuario);

  }

  ngOnInit() {

    this.mensageria.processamento = true;

    this.listarRodadaAtual.listarRodadaCartolaPorTemporada(this.anoAtual).subscribe((rodadaCartola: RodadaCartola) => {
      this.rodada = rodadaCartola;

      this.countRodadaAtual.consultaTimeRodadaCartolaCount(this.rodada.anoTemporada, this.rodada.idRodada).subscribe((count: number) => {
        this.totalParticipantes = count;

        this.premiacaoTotal = this.totalParticipantes * this.rodada.valorRodada;
        this.premiacaoPercentual = (this.premiacaoTotal * 10) / 100;
        this.premiacaoFinal = this.premiacaoTotal - this.premiacaoPercentual;

        this.premiacaoFinalFormat = this.premiacaoFinal.toLocaleString('pt-br', { minimumFractionDigits: 2 });

        this.dataFim = this.rodada.dtFimInscricao.substring(0 , 5);
        this.horaFim = this.rodada.hrFimInscricao.substring(0 , 5);

      });

      this.listaResultadoParcialRodada.listaResutaldoParcialRodada(this.rodada.anoTemporada, this.rodada.idRodada)
        .subscribe((resultParcial: any[]) => {
          this.parciais = resultParcial;
        });

    });

    this.mensageria.processamento = false;

  }

  addTimeRodada(): void {
    this.router.navigate(['/addTimeRodada']);
  }

  show() {

    this.dialogService.open(ModalAddTimeRodadaComponent, {
      contentStyle: {
        overflow: 'auto',
        backgroundColor: '#fff',
        'min-width': '300px',
        'min-height': '100px'
      },
      dismissableMask: true
    });
  }
 
  showTime(time: TimeCartola) {

    this.dialogService.open(ModalDetalheTimeUsuarioComponent,   {
      contentStyle: {
        overflow: 'auto',
        backgroundColor: '#fff',
        'min-width': '300px',
        'min-height': '100px'
      },
      dismissableMask: true,
      data: { time }
    });
  }

  trataRespostaAtletasPontuados(pontuados: any) {
    Object.keys(pontuados.atletas).forEach(atleta_id => {
      const atleta = {
        atleta_id: atleta_id,
        apelido: pontuados.atletas[atleta_id].apelido,
        pontuacao: pontuados.atletas[atleta_id].pontuacao,
        scout: pontuados.atletas[atleta_id].scout,
        foto: pontuados.atletas[atleta_id].foto,
        posicao_id: pontuados.atletas[atleta_id].posicao_id,
        clube_id: pontuados.atletas[atleta_id].clube_id
      };
      this.arrayAtletasPontuados.push(atleta);
    });
  }

  atualizarParciais() {
    this.mensageria.processamento = true;

    this.atletasPontuados.listarAtletasPontuados()
      .subscribe((pontuados) => this.trataRespostaAtletasPontuados(pontuados));


    // pontuação do JSON pontuados
    this.atletasPontuados.listarAtletasPontuados().subscribe((pontuados) => {
       Object.keys(pontuados.atletas).forEach(atleta_id => {
         const atleta = {
           atleta_id: atleta_id,
           apelido: pontuados.atletas[atleta_id].apelido,
           pontuacao: pontuados.atletas[atleta_id].pontuacao,
           scout: pontuados.atletas[atleta_id].scout,
           foto: pontuados.atletas[atleta_id].foto,
           posicao_id: pontuados.atletas[atleta_id].posicao_id,
           clube_id: pontuados.atletas[atleta_id].clube_id
        };
         this.arrayAtletasPontuados.push(atleta);
       });
     });

    // Processar atualização de pontuação
    // busca times salvo na base de dados
    this.listaResultadoParcialRodada.listaResutaldoParcialRodada(this.rodada.anoTemporada, this.rodada.idRodada)
      .subscribe((resultParcial: any[]) => {
        this.parciais = resultParcial;
        for (let i = 0; i < this.parciais.length; i++) {
          // Recuperar atletas por time
          this.consultarTimeCartola.consultarTimeCartola(this.parciais[i].time_id)
            .subscribe((data) => {
              this.capitao_id = data.capitao_id;


              // tratar pontuação do JSON pontuados
              this.totPontos = 0;
              this.pontuacaoParcial = 0;
              for (let x = 0; x < data.atletas.length; x++) {
                for (let i = 0; i < this.arrayAtletasPontuados.length; i++) {
                  if (data.atletas[x].atleta_id == this.arrayAtletasPontuados[i].atleta_id) {
                    // Dobrar pontuação do capitão
                    if (this.capitao_id == data.atletas[x].atleta_id) {
                      this.pontuacaoParcial = this.arrayAtletasPontuados[i].pontuacao * 2;
                    } else {
                      this.pontuacaoParcial = this.arrayAtletasPontuados[i].pontuacao;
                    }
                    this.totPontos += this.pontuacaoParcial;

                    // finalizar leitura array interno.
                    i = this.arrayAtletasPontuados.length;
                  }
                }
              }
              // Atualizar pontuação.
              this.timeRodadaCartola.anoTemporada = this.parciais[i].anoTemporada;
              this.timeRodadaCartola.idRodada = this.parciais[i].idRodada;
              this.timeRodadaCartola.idUsuario = this.parciais[i].idUsuario;
              this.timeRodadaCartola.time_id = this.parciais[i].time_id;
              this.timeRodadaCartola.pontosTotais = this.totPontos;
              this.timeRodadaCartola.pontosTotais.toFixed(2);

          //    console.log(this.timeRodadaCartola.pontosTotais);

              this.atualizarResultadoParcial.atualizarPontosRodadaCartola(this.timeRodadaCartola)
                .subscribe(() => {
                });

            });

        }
        this.mensageria.processamento = false;
      });
  }
}
