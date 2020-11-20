import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
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

  public anoTemporada: number;
  public idRodada: number;

  capitao_id: number;
  totPontos: number;
  pontuacaoParcial: number;

  public premiacaoPercentualLista = 0;
  public premiacaoFinalLista = 0;
  public premiacaoTotal = 0;
  public valorRodada = 0;
  public totalParticipantes = 0;

  public timeRodadaCartola: TimeRodadaCartola = <TimeRodadaCartola>{};

  constructor(
    private listaResultadoParcialRodada: CartolaAPIService,
    private consultarTimeCartola: CartolaAPIService,
    private atualizarResultadoParcial: CartolaAPIService,
    public usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {

    this.usuario$ = usuarioService.getUsuario();
    this.usuario$.subscribe(usuario => this.usuario = usuario);

  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.anoTemporada = params.anoTemporada;
      this.idRodada = params.idRodada;
      this.valorRodada = params.valorRodada;


    });
    this.atualizarlistaResultadoParcialRodada();
  }

  atualizarlistaResultadoParcialRodada() {
    this.parciais = [];
    this.listaResultadoParcialRodada.listaResutaldoParcialRodada(this.anoTemporada, this.idRodada)
      .subscribe((resultParcial: any[]) => {
        this.parciais = resultParcial;

        this.totalParticipantes = this.parciais.length;

        this.premiacaoTotal = this.totalParticipantes * this.valorRodada;

        for (let j = 0; j < this.parciais.length; j++) {
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
            this.premiacaoPercentualLista = (this.premiacaoTotal * 15) / 100;
            this.premiacaoFinalLista = this.premiacaoPercentualLista;
            this.parciais[j].premiacaoFinalFormatLista = this.premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
          }
          if (j === 3) {
            this.parciais[j].premiacaoFinalFormatLista = '10,00';
          }
          if (j === 4) {
            this.parciais[j].premiacaoFinalFormatLista = '10,00';
          }
          if (j === 5) {
            this.parciais[j].premiacaoFinalFormatLista = '10,00';
          }
        }
      });
  }


  atualizarParciais() {
    this.spinner.show('rodada');

    for (let i = 0; i < this.parciais.length; i++) {
      // Recuperar atletas por time
      this.consultarTimeCartola.consultarTimeCartola(this.parciais[i].time_id)
        .subscribe((data) => {
          this.capitao_id = data.capitao_id;

          this.totPontos = 0;
          this.pontuacaoParcial = 0;
          for (let x = 0; x < data.atletas.length; x++) {
            // Dobrar pontuação do capitão
            if (this.capitao_id == data.atletas[x].atleta_id) {
              this.pontuacaoParcial = data.atletas[x].pontos_num * 2;
            } else {
              this.pontuacaoParcial = data.atletas[x].pontos_num;
            }
            this.totPontos += this.pontuacaoParcial;
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
    setTimeout(() => {
      this.spinner.hide('rodada');
      this.atualizarlistaResultadoParcialRodada();
    }, 6000);
    this.ngOnInit();
  }  

}
