import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TimeCartola } from 'src/app/interfaces/timeCartola';
import { AuthService } from 'src/app/services/auth.service';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { ModalAddTimeRodadaComponent } from './modal-add-time-rodada/modal-add-time-rodada.component';
import { ModalDetalheTimeUsuarioComponent } from './modal-detalhe-time-usuario/modal-detalhe-time-usuario.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { TimeRodadaCartola } from 'src/app/interfaces/timeRodadaCartola';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CompeticaoCartola } from 'src/app/interfaces/competicaoCartola';

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

  public anoTemporada: number;
  public nrRodada: number;
  public dataFimInscricao: string;
  public horaFimInscricao: string;
  public statusCompeticao: string;
  public valorCompeticao: number;
  loading = false;
  tempo = 2000;
  autenticado = false;

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

  slug = [];

  grupo = '';

  

  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    public authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private listaResultadoParcialRodada: CartolaAPIService,
    private atletasPontuados: CartolaAPIService,
    private consultarTimeCartola: CartolaAPIService,
    private atualizarResultadoParcial: CartolaAPIService,
    private consultarMercadoStatus: CartolaAPIService
  ) { }

  ngOnInit() {
    this.authService.autenticado$.subscribe(autenticado => {
      if (autenticado) {
        this.autenticado = autenticado;
      } else {
        this.autenticado = false;
      }
    });

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

    this.consultarMercadoStatus.consultarMercadoStatus().subscribe(status => {

      this.rodada_atual = status.rodada_atual;
      this.status_mercado = status.status_mercado;

      if (this.rodada_atual == this.nrRodada) {
        if (this.status_mercado === 1) {
          this.statusCompeticao = 'Aberta';
        } else {
          if (this.status_mercado === 2) {
            this.statusCompeticao = 'Fechada';
          }
        }
      }

      if (this.statusCompeticao === 'Fechada') {
        this.atualizarParciais();
      } else {
        this.atualizarlistaResultadoParcialRodada();
      }

    });

  }

  showSpinner() {
    this.spinner.show('rodada');
    setTimeout(() => { this.spinner.hide('rodada'); }, this.tempo);
  }


  atualizarlistaResultadoParcialRodada() {
    this.showSpinner();
    this.parciais = [];
    if (this.statusCompeticao === 'Fechada') {
      this.atletasPontuados.listarAtletasPontuados()
        .subscribe((pontuados) => {
          this.trataRespostaAtletasPontuados(pontuados);

          this.listaResultadoParcialRodada.listaResutaldoParcialRodada(this.anoTemporada, this.nrRodada)
            .subscribe((resultParcial: any[]) => {
              this.parciais = resultParcial;
              for (let j = 0; j < this.parciais.length; j++) {

                this.premiacaoTotal = this.parciais.length * this.valorCompeticao;
                this.premiacaoPercentualLista = 0;
                this.premiacaoFinalLista = 0;
                this.parciais[j].premiacaoFinalFormatLista = 0;
                if (j === 0) {
                  this.premiacaoPercentualLista = (this.premiacaoTotal * 50) / 100;
                  this.premiacaoFinalLista = this.premiacaoPercentualLista;
                  this.parciais[j].premiacaoFinalFormatLista =
                    this.premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
                }
                if (j === 1) {

                  this.premiacaoPercentualLista = (this.premiacaoTotal * 25) / 100;
                  this.premiacaoFinalLista = this.premiacaoPercentualLista;
                  this.parciais[j].premiacaoFinalFormatLista =
                    this.premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
                }
                if (j === 2) {
                  this.premiacaoPercentualLista = (this.premiacaoTotal * 10) / 100;
                  this.premiacaoFinalLista = this.premiacaoPercentualLista;
                  this.parciais[j].premiacaoFinalFormatLista =
                    this.premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
                }
                if (j === 3) {
                  this.premiacaoPercentualLista = (this.premiacaoTotal * 5) / 100;
                  this.premiacaoFinalLista = this.premiacaoPercentualLista;
                  this.parciais[j].premiacaoFinalFormatLista =
                    this.premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
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
      this.listaResultadoParcialRodada.listaResutaldoParcialRodada(this.anoTemporada, this.nrRodada)
        .subscribe((resultParcial: any[]) => {
          this.parciais = resultParcial;
          for (let j = 0; j < this.parciais.length; j++) {

            this.premiacaoTotal = this.parciais.length * this.valorCompeticao;
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
          }
        });
    }

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
    this.tempo = 5000;
    this.spinner.show('rodada');

    this.atletasPontuados.listarAtletasPontuados()
      .subscribe((pontuados) => {
        this.trataRespostaAtletasPontuados(pontuados);

        // Processar atualização de pontuação
        // busca times salvo na base de dados
        this.listaResultadoParcialRodada.listaResutaldoParcialRodada(this.anoTemporada, this.nrRodada)
          .subscribe((resultParcial: any[]) => {
            this.parciais = resultParcial;
            for (let i = 0; i < this.parciais.length; i++) {
              // Recuperar atletas por time
              this.consultarTimeCartola.consultarTimeCartola(this.parciais[i].time_id)
                .subscribe((data) => {

                  // tratar pontuação do JSON pontuados
                  this.capitao_id = data.capitao_id;
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
          });
      });
    setTimeout(() => {
      this.spinner.hide('rodada');
      this.atualizarlistaResultadoParcialRodada();
    }, this.tempo);

  }


  gerarBilhete(competicao: CompeticaoCartola): void {
    this.router.navigate(['/cartola/gerarBilhete'], { queryParams: competicao });
  }

  addTimeRodada(idRodada: number) {


    if (this.autenticado) {
      const modalRef = this.modalService.open(ModalAddTimeRodadaComponent,
        {
          scrollable: true,
          windowClass: 'modal-job-scrollable'
        });

      const data = {
        idRodada: idRodada
      }
      modalRef.componentInstance.fromParent = data;
    } else {
      this.toastr.info(
        '<span class="now-ui-icons ui-1_bell-53"></span>' +
        '<b>Point do Jogador</b>' +
        ' - Faça seu Login para participar da Rodada!',
        '',
        {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: 'alert alert-info alert-with-icon',
          positionClass: 'toast-' + 'top' + '-' + 'right'
        }
      );
      this.router.navigate(['/pages/login']);
    }
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

    this.grupo = '🎩 POINTDOJOGADOR 🎩' + ' - RDD ' + this.nrRodada + ' =>' + this.slug.join(';');

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

    html2canvas(document.querySelector(".rodadaPDF"), {useCORS: true}).then(canvas => {
      var pdf = new jsPDF('l', 'pt', [canvas.width, canvas.height]);
      var imgData = canvas.toDataURL("image/png", 1.0);
      pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
      var arquivo = 'PointdoJogadorRDD' + this.nrRodada + '.pdf';
      pdf.save(arquivo);

    });
    
  }

}
