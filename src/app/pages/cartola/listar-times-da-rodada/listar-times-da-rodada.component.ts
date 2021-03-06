import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { PontuacaoTimeRodada } from 'src/app/interfaces/pontuacaoTimeRodada';
import { TimeBilheteCompeticaoCartola } from 'src/app/interfaces/timeBilheteCompeticaoCartola';
import { TimeRodadaCartola } from 'src/app/interfaces/timeRodadaCartola';
import { Usuario } from 'src/app/interfaces/usuario';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-listar-times-da-rodada',
  templateUrl: './listar-times-da-rodada.component.html',
  styleUrls: ['./listar-times-da-rodada.component.css']
})
export class ListarTimesDaRodadaComponent implements OnInit {

  parciais = [];

  usuario$: Observable<Usuario>;
  usuario: Usuario;

  public nrSequencialRodadaCartola: number;
  public nrRodada: number;

  capitao_id: number;
  totPontos: number;
  pontuacaoParcial: number;
  timeBilhete: TimeBilheteCompeticaoCartola = <TimeBilheteCompeticaoCartola>{};
  pontuacaoTimeRodada: PontuacaoTimeRodada = <PontuacaoTimeRodada>{};

  public valorRodada = 0;
  public podeAtualizar = false;
  public tipoCompeticao = '';
  public rodadaAtual = 0;

  public timeRodadaCartola: TimeRodadaCartola = <TimeRodadaCartola>{};

  constructor(
    private listarTimesDaCompeticaoService: CartolaAPIService,
    private consultarTimeCartola: CartolaAPIService,
    private atualizarResultadoParcial: CartolaAPIService,
    public usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private consultarMercadoStatus: CartolaAPIService,
    private atualizarPontuacaoService: CartolaAPIService
  ) {

    this.usuario$ = usuarioService.getUsuario();
    this.usuario$.subscribe(usuario => this.usuario = usuario);

  }

  ngOnInit() {

    this.route.queryParams
         .subscribe(params => {
        this.nrSequencialRodadaCartola = params.nrSequencialRodadaCartola;
        this.nrRodada = params.nrRodada;
        this.valorRodada = params.valorCompeticao;
        this.tipoCompeticao = params.tipoCompeticao;

        this.consultarMercadoStatus.consultarMercadoStatus()
          .toPromise()
          .then(status => {
            //   .subscribe(status => {
              this.rodadaAtual = status.rodada_atual;
            if ((status.rodada_atual - 1) == this.nrRodada) {
              this.podeAtualizar = true;
            }
            if (this.nrRodada == 0) {
              this.podeAtualizar = true;
            }
            this.atualizarlistaResultadoParcialRodada();
          });

      });
     
  }

  atualizarlistaResultadoParcialRodada() {
    this.spinner.show('rodada');
    this.parciais = [];
    this.listarTimesDaCompeticaoService.listarTimesDaCompeticao(this.nrSequencialRodadaCartola)
      .toPromise()
      .then((resultParcial: any[]) => {
        this.parciais = resultParcial;
        
        this.spinner.hide('rodada');
      });
  }


  atualizarParciais() {
    this.spinner.show('rodada');

    for (let i = 0; i < this.parciais.length; i++) {
      // Recuperar atletas por time
      this.consultarTimeCartola.consultarTimeCartola(this.parciais[i].time_id)
        .toPromise()
        .then((data) => {
          //   .subscribe((data) => {
          this.totPontos = 0;
          this.pontuacaoParcial = 0;

          // Atualizar pontua????o. (piterson)
          this.timeBilhete.idBilhete = this.parciais[i].idBilhete
          this.timeBilhete.time_id = this.parciais[i].time_id;
          this.timeBilhete.pontuacaoParcial = data.pontos;
          this.timeBilhete.pontuacaoParcial.toFixed(2);
          this.timeBilhete.qtJogadoresPontuados = 12; //ajustar;
          this.timeBilhete.pontuacaoTotalCompeticao = data.pontos_campeonato;
          this.timeBilhete.pontuacaoTotalCompeticao.toFixed(2);

          this.atualizarResultadoParcial.atualizarPontosTimeBilhete(this.timeBilhete)
            .toPromise()
            .then(() => {
              //     .subscribe(() => {
              this.pontuacaoTimeRodada.time_id = this.parciais[i].time_id;
              this.pontuacaoTimeRodada.nrRodada = this.rodadaAtual - 1;
              this.pontuacaoTimeRodada.mesRodada = 6 //junho
              this.pontuacaoTimeRodada.pontuacao = data.pontos;

              this.atualizarPontuacaoService.atualizarPontuacaoTimeRodada(this.pontuacaoTimeRodada)
                .toPromise()
                .then(() => {
                  this.spinner.hide('rodada');
                  this.atualizarlistaResultadoParcialRodada();
                  //    .subscribe(() => {
                });

            });
        });

    }
    //   setTimeout(() => {
    //     this.spinner.hide('rodada');
    //     this.atualizarlistaResultadoParcialRodada();
    //   }, 6000);
    //   this.ngOnInit();
  }


  gerarPDF() {

    html2canvas(document.querySelector(".rodadaPDF"), { useCORS: true }).then(canvas => {
      var pdf = new jsPDF('l', 'pt', [canvas.width, canvas.height]);
      var imgData = canvas.toDataURL("image/png", 1.0);
      pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
      var arquivo = 'PointdoJogadorRDD' + this.nrRodada + '.pdf';
      pdf.save(arquivo);

    });

  }

}
