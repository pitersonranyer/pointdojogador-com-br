import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartolaAPIService } from '../services/cartola-api.service';
import { RodadaCartola } from '../interfaces/rodadaCartola';
import { ModalAddTimeRodadaComponent } from '../modal/modal-add-time-rodada/modal-add-time-rodada.component';

import { DialogService, DynamicDialogConfig } from 'primeng/api';
import { TimeRodadaCartola } from '../interfaces/timeRodadaCartola';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { MensageriaService } from '../services/mensageria.service';
import { TimeCartola } from '../interfaces/timeCartola';
import { ModalDetalheTimeUsuarioComponent } from '../modal/detalhe-time-usuario/modal-detalhe-time-usuario.component';

@Component({
  selector: 'app-listar-add-time-rodada',
  templateUrl: './listar-add-time-rodada.component.html',
  styleUrls: ['./listar-add-time-rodada.component.css']
})
export class ListarAddTimeRodadaComponent implements OnInit {

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

  public anoTemporada: number;
  public idRodada: number;
  public dtFimInscricao: string;
  public hrFimInscricao: string;
  public status: string;
  public valorRodada: number;



  constructor(private router: Router,
    private countRodadaAtual: CartolaAPIService,
    private listaResultadoParcialRodada: CartolaAPIService,
    private atualizarResultadoParcial: CartolaAPIService,
    private consultarTimeCartola: CartolaAPIService,
    private atletasPontuados: CartolaAPIService,
    private dialogService: DialogService,
    public usuarioService: UsuarioService,
    public mensageria: MensageriaService,
    private route: ActivatedRoute,
  ) {

    this.usuario$ = usuarioService.getUsuario();
    this.usuario$.subscribe(usuario => this.usuario = usuario);


  }

  ngOnInit() {


    this.route.queryParams.subscribe(params => {
      this.anoTemporada = params.anoTemporada;
      this.dtFimInscricao = params.dtFimInscricao;
      this.hrFimInscricao = params.hrFimInscricao;
      this.idRodada = params.idRodada;
      this.status = params.status;
      this.valorRodada = params.valorRodada;
    });


    this.mensageria.processamento = true;
    this.count = 0;
    this.countRodadaAtual.consultaTimeRodadaCartolaCount(this.anoTemporada, this.idRodada).subscribe((count: number) => {
      this.totalParticipantes = count;

      this.premiacaoTotal = this.totalParticipantes * this.valorRodada;
      this.premiacaoPercentual = (this.premiacaoTotal * 10) / 100;
      this.premiacaoFinal = this.premiacaoTotal - this.premiacaoPercentual;
      this.premiacaoFinalFormat = this.premiacaoFinal.toLocaleString('pt-br', { minimumFractionDigits: 2 });
      this.dataFim = this.dtFimInscricao.substring(0, 5);
      this.horaFim = this.hrFimInscricao.substring(0, 5);


      if (this.status === 'Fechada') {
        this.atletasPontuados.listarAtletasPontuados()
          .subscribe((pontuados) => {
            this.trataRespostaAtletasPontuados(pontuados);

            this.listaResultadoParcialRodada.listaResutaldoParcialRodada(this.anoTemporada, this.idRodada)
              .subscribe((resultParcial: any[]) => {
                this.parciais = resultParcial;
                for (let j = 0; j < this.parciais.length; j++) {

                  this.consultarTimeCartola.consultarTimeCartola(this.parciais[j].time_id).subscribe((data) => {
                    this.atletas = data.atletas;
                    this.count = 0;
                    for (let x = 0; x < this.atletas.length; x++) {
                      for (let i = 0; i < this.arrayAtletasPontuados.length; i++) {
                        if (this.atletas[x].atleta_id == this.arrayAtletasPontuados[i].atleta_id) {
                          if (this.arrayAtletasPontuados[i].posicao_id === 6) {
                            if (this.arrayAtletasPontuados[i].pontuacao === 0) {
                              continue;
                            } else {
                              this.count = this.count + 1;
                            }
                          } else {
                            this.count = this.count + 1;
                          }

                          // finalizar leitura array interno.
                          i = this.arrayAtletasPontuados.length;
                        }
                      }
                    }
                    this.parciais[j].atletasJogados = this.count;
                  });

                }

              });

          });
      } else {
        this.listaResultadoParcialRodada.listaResutaldoParcialRodada(this.anoTemporada, this.idRodada)
          .subscribe((resultParcial: any[]) => {
            this.parciais = resultParcial;
          });
      }

    });

    this.mensageria.processamento = false;


  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }

  show(idRodada: number) {

    this.dialogService.open(ModalAddTimeRodadaComponent, {
      contentStyle: {
        overflow: 'auto',
        backgroundColor: '#fff',
        'min-width': '300px',
        'min-height': '100px'
      },
      dismissableMask: true,
      data: { idRodada }
    });
  }

  showTime(time: TimeCartola) {

    this.dialogService.open(ModalDetalheTimeUsuarioComponent, {
      contentStyle: {
        overflow: 'auto',
        backgroundColor: '#fff',
        height: '500px'
      },
      dismissableMask: true,
      data: { time }
    });
  }

  public gerarPDF() {
    const minhaTabela = document.getElementById('pdf').innerHTML;


    // CRIA UM OBJETO WINDOW
    const win = window.open('', '', 'height=700,width=700');

    win.document.write(`
  <html>
    <head>
      <style>
      div.box-tabela-premiacao {
        width: 235px;
    }
    span.datatable-colocacao {
        font-weight: 600;
        font-size: 14px;
        margin: 10px 5px 0 0;
        width: 32px;
        float: left;
    }
    .pointer-variacao {
        width: 23px;
        margin: 12px 2px 0 0;
        float: left;
    }
    img.datatable-escudo {
        width: 40px;
        float: left;
        height: 40px;
        margin-right: 10px;
    }
    img.datatable-pro {
        width: 15px;
        height: 15px;
        margin-right: 5px;
    }
    span.datatable-nome-time {
        margin-left: 2px;
        font-size: 13px;
        display: block;
        font-family: "Open Sans";
        font-weight: bold;
        color: #333;
    }
    span.datatable-nome-coach {
        margin-left: 2px;
        font-size: 12px;
        display: block;
        font-family: "Open Sans";
        font-weight: 300;
        color: #333;
    }
    span.datatable-pontuacao {
        font-size: 18px;
        font-weight: 600;
    }
      </style>
    </head>
<body onload="window.print()">${minhaTabela}</body>
  </html>`);

    win.document.close(); 	                                         // FECHA A JANELA

    win.print();                                                            // IMPRIME O CONTEUDO
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

    // Processar atualização de pontuação
    // busca times salvo na base de dados
    this.listaResultadoParcialRodada.listaResutaldoParcialRodada(this.anoTemporada, this.idRodada)
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


              this.atualizarResultadoParcial.atualizarPontosRodadaCartola(this.timeRodadaCartola)
                .subscribe(() => {
                });

            });

        }
        this.mensageria.processamento = false;
      });

    this.ngOnInit();

  }
}
