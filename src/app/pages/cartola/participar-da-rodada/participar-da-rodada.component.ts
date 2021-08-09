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

    this.listarTimesDaCompeticaoService.listarTimesDaCompeticao(this.competicaoRodada.nrSequencialRodadaCartola)
      .toPromise()
      .then((resultParcial) => {
        this.parciais = resultParcial;
      })
      .then(() => {
        
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

    this.atletasPontuados.atualizarParciais(this.competicaoRodada.nrSequencialRodadaCartola, this.rodada_atual)
      .toPromise()
      .then(() => {

        this.atualizarlistaResultadoParcialRodada();

      })

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

  



}
