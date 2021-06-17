import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CompeticaoCartola } from 'src/app/interfaces/competicaoCartola';
import { TimeBilheteCompeticaoCartola } from 'src/app/interfaces/timeBilheteCompeticaoCartola';
import { TimeCartola } from 'src/app/interfaces/timeCartola';
import { TimeRodadaCartola } from 'src/app/interfaces/timeRodadaCartola';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { ModalDetalheTimeUsuarioComponent } from './modal-detalhe-time-usuario/modal-detalhe-time-usuario.component';

@Component({
  selector: 'app-participar-da-rodada',
  templateUrl: './participar-da-rodada.component.html',
  styleUrls: ['./participar-da-rodada.component.css']
})
export class ParticiparDaRodadaComponent implements OnInit, OnDestroy {

  @ViewChild('content') content: ElementRef;

  public premiacaoTotal = 0;
  public premiacaoPercentualLista = 0;
  public premiacaoFinalLista = 0;

  parciais = [];
  dataAtletas = [];

  public anoTemporada: number;
  public dataFimInscricao: string;
  public horaFimInscricao: string;
  public statusCompeticao: string;
  public valorCompeticao: number;
  loading = false;
  tempo = 2000;


  arrayAtletasPontuados = [];
  totPontos: number;
  pontuacaoParcial: number;
  capitao_id: number;
  public timeRodadaCartola: TimeRodadaCartola = <TimeRodadaCartola>{};

  count: number;
  atletas: Array<any> = [];
  public rodada_atual = 0;
  public status_mercado = 0;
  nomeTimeBusca: string;
  competicaoRodada: CompeticaoCartola = <CompeticaoCartola>{};

  timeBilhete: TimeBilheteCompeticaoCartola = <TimeBilheteCompeticaoCartola>{};

  slug = [];

  reservas = [];

  grupo = '';



  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private atletasPontuados: CartolaAPIService,
    private consultarTimeCartola: CartolaAPIService,
    private atualizarResultadoParcial: CartolaAPIService,
    private consultarMercadoStatus: CartolaAPIService,
    private listarTimesDaCompeticaoService: CartolaAPIService,
    private consultarSubstituicoesService: CartolaAPIService
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.competicaoRodada.nrSequencialRodadaCartola = params.nrSequencialRodadaCartola;
      this.competicaoRodada.anoTemporada = params.anoTemporada;
      this.competicaoRodada.dataFimInscricao = params.dataFimInscricao;
      this.competicaoRodada.horaFimInscricao = params.horaFimInscricao;
      this.competicaoRodada.nrRodada = params.nrRodada;
      this.competicaoRodada.statusCompeticao = params.statusCompeticao;
      this.competicaoRodada.valorCompeticao = params.valorCompeticao;
      this.competicaoRodada.idUsuarioAdmLiga = params.idUsuarioAdmLiga;
      this.competicaoRodada.nomeLiga = params.nomeLiga;
      this.competicaoRodada.tipoCompeticao = params.tipoCompeticao;


    });

    this.consultarMercadoStatus.consultarMercadoStatus()
      .toPromise()
      .then(status => {
        //.subscribe(status => {

        this.rodada_atual = status.rodada_atual;
        this.status_mercado = status.status_mercado;

        if (this.rodada_atual == this.competicaoRodada.nrRodada) {
          if (this.status_mercado === 1) {
            this.statusCompeticao = 'Aberta';
          } else {
            if (this.status_mercado === 2) {
              this.statusCompeticao = 'Fechada';
            }
          }
        }

        this.atualizarlistaResultadoParcialRodada();


      });

  }

  showSpinner() {
    this.spinner.show('rodada');
    setTimeout(() => { this.spinner.hide('rodada'); }, this.tempo);
  }


  atualizarlistaResultadoParcialRodada() {
    this.spinner.show('rodada');
    this.parciais = [];

    this.listarTimesDaCompeticaoService.listarTimesDaCompeticao(this.competicaoRodada.nrSequencialRodadaCartola)
      .toPromise()
      .then((resultParcial: any[]) => {
        //  .subscribe((resultParcial: any[]) => {
        this.parciais = resultParcial;
        for (let j = 0; j < this.parciais.length; j++) {



          if (this.competicaoRodada.tipoCompeticao === 'TIRO CURTO') {
            this.premiacaoTotal = this.parciais.length * this.competicaoRodada.valorCompeticao;
            this.premiacaoPercentualLista = 0;
            this.premiacaoFinalLista = 0;
            this.parciais[j].premiacaoFinalFormatLista = 0;
            if (j === 0) {
              this.premiacaoPercentualLista = (this.premiacaoTotal * 50) / 100;
              this.premiacaoFinalLista = this.premiacaoPercentualLista;
              this.parciais[j].premiacaoFinalFormatLista = this.premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
            }
            if (j === 1) {
              this.premiacaoPercentualLista = (this.premiacaoTotal * 25) / 100;
              this.premiacaoFinalLista = this.premiacaoPercentualLista;
              this.parciais[j].premiacaoFinalFormatLista = this.premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
            }
            if (j === 2) {
              this.premiacaoPercentualLista = (this.premiacaoTotal * 10) / 100;
              this.premiacaoFinalLista = this.premiacaoPercentualLista;
              this.parciais[j].premiacaoFinalFormatLista = this.premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
            }
            if (j === 3) {
              this.premiacaoPercentualLista = (this.premiacaoTotal * 5) / 100;
              this.premiacaoFinalLista = this.premiacaoPercentualLista;
              this.parciais[j].premiacaoFinalFormatLista = this.premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
            }
            if (j === 4) {
              this.parciais[j].premiacaoFinalFormatLista = '10,00';
            }
            if (j === 5) {
              this.parciais[j].premiacaoFinalFormatLista = '10,00';
            }
            if (j === 6) {
              this.parciais[j].premiacaoFinalFormatLista = '10,00';
            }
          } else {
            this.parciais[j].totalAnual = 0;
            if (this.status_mercado === 2) {
              this.parciais[j].totalAnual = Number(this.parciais[j].pontuacaoTotalCompeticao) + Number(this.parciais[j].pontuacaoParcial)
            } else {
              this.parciais[j].totalAnual = Number(this.parciais[j].pontuacaoTotalCompeticao)
            }
          }
        }
        this.spinner.hide('rodada');
      });
  }



  ngOnDestroy() {
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
    this.spinner.show('rodada');

    this.atletasPontuados.listarAtletasPontuados()
      .toPromise()
      .then((pontuados) => {
        //   .subscribe((pontuados) => {
        //    console.log('passo 1');
        this.arrayAtletasPontuados = pontuados;
        // Processar atualização de pontuação
        // busca times salvo na base de dados
        this.listarTimesDaCompeticaoService.listarTimesDaCompeticao(this.competicaoRodada.nrSequencialRodadaCartola)
          .toPromise()
          .then((resultParcial: any[]) => {
            //      console.log('passo 2');
            //    .subscribe((resultParcial: any[]) => {
            this.parciais = resultParcial;
            for (let i = 0; i < this.parciais.length; i++) {
              // Recuperar atletas por time
              this.consultarTimeCartola.consultarTimeCartola(this.parciais[i].time_id)
                .toPromise()
                .then((data) => {
                  //            console.log('passo 3');
                  //  .subscribe((data) => {
                  // tratar pontuação do JSON pontuados
                  this.capitao_id = data.capitao_id;
                  this.totPontos = 0;
                  this.pontuacaoParcial = 0;
                  if (data.pontos_campeonato === null) {
                    this.parciais[i].pontosCampeonato = 0
                  } else {
                    this.parciais[i].pontosCampeonato = data.pontos_campeonato;
                  }

                  for (let x = 0; x < data.atletas.length; x++) {
                    for (let i = 0; i < this.arrayAtletasPontuados.length; i++) {
                      if (Number(data.atletas[x].atleta_id) === Number(this.arrayAtletasPontuados[i].atleta_id)) {
                        // Dobrar pontuação do capitão
                        if (Number(this.capitao_id) === Number(data.atletas[x].atleta_id)) {
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

                  this.consultarSubstituicoesService.consultarBancoDeReservas(this.parciais[i].time_id, this.competicaoRodada.nrRodada)
                    .toPromise()
                    .then((reservas) => {
                      //             console.log('passo 4');
                      //  .subscribe((reservas) => {
                      this.reservas = reservas;
                      for (let y = 0; y < this.reservas.length; y++) {
                        for (let z = 0; z < this.arrayAtletasPontuados.length; z++) {
                          if (Number(this.reservas[y].entrou.atleta_id) === Number(this.arrayAtletasPontuados[z].atleta_id)) {

                            // Dobrar pontuação do capitão
                            if (Number(this.capitao_id) === Number(this.reservas[y].entrou.atleta_id)) {
                              this.pontuacaoParcial = this.arrayAtletasPontuados[z].pontuacao * 2;
                            } else {
                              this.pontuacaoParcial = this.arrayAtletasPontuados[z].pontuacao;
                            }
                            this.totPontos += this.pontuacaoParcial;

                            // finalizar leitura array interno.
                            z = this.arrayAtletasPontuados.length;
                          }
                        }
                      }


                    });



                  // atualizar quantidade de jogadores que já entram em campo.
                  this.count = 0;

                  for (let y = 0; y < data.atletas.length; y++) {
                    for (let z = 0; z < this.arrayAtletasPontuados.length; z++) {
                      if (data.atletas[y].atleta_id == this.arrayAtletasPontuados[z].atleta_id) {
                        if (this.arrayAtletasPontuados[z].posicao_id === 6) {
                          if (this.arrayAtletasPontuados[z].pontuacao === 0) {
                            continue;
                          } else {
                            this.count = this.count + 1;
                          }
                        } else {
                          this.count = this.count + 1;
                        }

                        // finalizar leitura array interno.
                        z = this.arrayAtletasPontuados.length;
                      }
                    }
                  }


                  // Atualizar pontuação. (piterson)
                  this.timeBilhete.idBilhete = this.parciais[i].idBilhete
                  this.timeBilhete.time_id = this.parciais[i].time_id;
                  this.timeBilhete.pontuacaoParcial = this.totPontos;
                  this.timeBilhete.pontuacaoParcial.toFixed(2);
                  this.timeBilhete.qtJogadoresPontuados = this.count;
                  this.timeBilhete.pontuacaoTotalCompeticao = this.parciais[i].pontosCampeonato;
                  this.timeBilhete.pontuacaoTotalCompeticao.toFixed(2);

                  // console.log(this.count); 

                  //console.log(this.timeBilhete.pontuacaoTotalCompeticao);

                  this.atualizarResultadoParcial.atualizarPontosTimeBilhete(this.timeBilhete)
                    .toPromise()
                    .then(() => {
                      //   console.log('passo 5');
                      //   .subscribe(() => {
                    });

                });
            }
          });
        this.spinner.hide('rodada');
        //      console.log('passo 6');
        this.atualizarlistaResultadoParcialRodada();
      });



  }


  gerarBilhete(competicao: CompeticaoCartola): void {
    this.router.navigate(['/cartola/gerarBilhete'], { queryParams: competicao });
  }


  showTime(time: TimeCartola) {
    const modalRef = this.modalService.open(ModalDetalheTimeUsuarioComponent,
      {
        scrollable: true,
        windowClass: 'modal-job-scrollable'
      });

    const data = {
      time: time
    }

    modalRef.componentInstance.fromParent = data;

  }

  exportarTimes() {
    for (let i = 0; i < this.parciais.length; i++) {
      this.slug[i] = this.parciais[i].time_id
    }


    if (this.competicaoRodada.nrRodada != 0) {
      this.grupo = '🎩' + this.competicaoRodada.nomeLiga + '🎩' + ' - RDD ' + this.competicaoRodada.nrRodada + ' =>' + this.slug.join(';');
    } else {
      this.grupo = '🎩' + this.competicaoRodada.nomeLiga + '🎩' + '-' +
        this.competicaoRodada.tipoCompeticao + ' =>' + this.slug.join(';');
    }


    navigator.clipboard.writeText(this.grupo);


    this.toastr.success(
      '<span class="now-ui-icons ui-1_bell-53"></span>' +
      ' Códigos copiados com sucesso!',
      '',
      {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-success alert-with-icon',
        positionClass: 'toast-' + 'top' + '-' + 'right'
      }
    );

  }


  gerarPDF() {

    html2canvas(document.querySelector(".rodadaPDF"), { useCORS: true }).then(canvas => {
      var pdf = new jsPDF('l', 'pt', [canvas.width, canvas.height]);
      var imgData = canvas.toDataURL("image/png", 1.0);
      pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
      var arquivo = 'PointdoJogadorRDD' + this.competicaoRodada.nrRodada + '.pdf';
      pdf.save(arquivo);

    });

  }

  atualizarParciaisNew() {

    //  this.spinner.show('rodada');

    this.atletasPontuados.listarAtletasPontuados()
      .toPromise()
      .then((pontuados) => {
        console.log('passo 1');
        this.trataRespostaAtletasPontuados(pontuados);
      })

      .then(() => {
        this.listarTimesDaCompeticaoService.listarTimesDaCompeticao(this.competicaoRodada.nrSequencialRodadaCartola)
          .toPromise()
          .then((resultParcial: any[]) => {
            console.log('passo 2');
            this.parciais = resultParcial;
          })
          .then(() => {
            for (let i = 0; i < this.parciais.length; i++) {
              // Recuperar atletas por time
              this.consultarTimeCartola.consultarTimeCartola(this.parciais[i].time_id)
                .toPromise()
                .then((data) => {
                  console.log('passo 3');
                  // tratar pontuação do JSON pontuados
                  this.capitao_id = data.capitao_id;
                  this.totPontos = 0;
                  this.pontuacaoParcial = 0;
                  if (data.pontos_campeonato === null) {
                    this.parciais[i].pontosCampeonato = 0
                  } else {
                    this.parciais[i].pontosCampeonato = data.pontos_campeonato;
                  }
                  this.dataAtletas = data.atletas;
                })
                .then(() => {
                  for (let x = 0; x < this.dataAtletas.length; x++) {
                    for (let i = 0; i < this.arrayAtletasPontuados.length; i++) {
                      if (Number(this.dataAtletas[x].atleta_id) === Number(this.arrayAtletasPontuados[i].atleta_id)) {
                        // Dobrar pontuação do capitão
                        if (Number(this.capitao_id) === Number(this.dataAtletas[x].atleta_id)) {
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
                  console.log('passo 4');
                })
                .then(() => {
                  this.consultarSubstituicoesService.consultarBancoDeReservas(this.parciais[i].time_id, this.competicaoRodada.nrRodada)
                    .toPromise()
                    .then((reservas) => {
                      this.reservas = reservas;
                    })
                    .then(() => {
                      for (let y = 0; y < this.reservas.length; y++) {
                        for (let z = 0; z < this.arrayAtletasPontuados.length; z++) {
                          if (Number(this.reservas[y].entrou.atleta_id) === Number(this.arrayAtletasPontuados[z].atleta_id)) {

                            // Dobrar pontuação do capitão
                            if (Number(this.capitao_id) === Number(this.reservas[y].entrou.atleta_id)) {
                              this.pontuacaoParcial = this.arrayAtletasPontuados[z].pontuacao * 2;
                            } else {
                              this.pontuacaoParcial = this.arrayAtletasPontuados[z].pontuacao;
                            }
                            this.totPontos += this.pontuacaoParcial;

                            // finalizar leitura array interno.
                            i = this.arrayAtletasPontuados.length;
                          }
                        }
                      }

                      // atualizar quantidade de jogadores que já entram em campo.
                      this.count = 0;

                      for (let y = 0; y < this.dataAtletas.length; y++) {
                        for (let z = 0; z < this.arrayAtletasPontuados.length; z++) {
                          if (this.dataAtletas[y].atleta_id == this.arrayAtletasPontuados[z].atleta_id) {
                            if (this.arrayAtletasPontuados[z].posicao_id === 6) {
                              if (this.arrayAtletasPontuados[z].pontuacao === 0) {
                                continue;
                              } else {
                                this.count = this.count + 1;
                              }
                            } else {
                              this.count = this.count + 1;
                            }

                            // finalizar leitura array interno.
                            z = this.arrayAtletasPontuados.length;
                          }
                        }
                      }

                      console.log('passo 5');

                    }).then(() => {

                      // Atualizar pontuação. (piterson)
                      this.timeBilhete.idBilhete = this.parciais[i].idBilhete
                      this.timeBilhete.time_id = this.parciais[i].time_id;
                      this.timeBilhete.pontuacaoParcial = this.totPontos;
                      this.timeBilhete.pontuacaoParcial.toFixed(2);
                      this.timeBilhete.qtJogadoresPontuados = this.count;
                      this.timeBilhete.pontuacaoTotalCompeticao = this.parciais[i].pontosCampeonato;
                      this.timeBilhete.pontuacaoTotalCompeticao.toFixed(2);


                      this.atualizarResultadoParcial.atualizarPontosTimeBilhete(this.timeBilhete)
                        .toPromise()
                        .then(() => {
                          console.log('passo 6');
                          //   .subscribe(() => {
                        })

                    })

                })
            }
          })
      })

  }



}
