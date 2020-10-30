import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartolaAPIService } from '../services/cartola-api.service';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { MensageriaService } from '../services/mensageria.service';
import { TimeRodadaCartola } from '../interfaces/timeRodadaCartola';


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

  public timeRodadaCartola: TimeRodadaCartola = <TimeRodadaCartola>{};

  constructor(private router: Router,
    private listaResultadoParcialRodada: CartolaAPIService,
    private consultarTimeCartola: CartolaAPIService,
    private atualizarResultadoParcial: CartolaAPIService,
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
      this.idRodada = params.idRodada;
      this.premiacaoTotal = params.valorRodada;


    });
    this.atualizarlistaResultadoParcialRodada();
  }

  atualizarlistaResultadoParcialRodada() {
    this.parciais = [];
    this.listaResultadoParcialRodada.listaResutaldoParcialRodada(this.anoTemporada, this.idRodada)
      .subscribe((resultParcial: any[]) => {
        this.parciais = resultParcial;
        console.log(this.parciais);
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
    this.atualizarlistaResultadoParcialRodada();
  }

  voltar() {
    this.router.navigate(['/rodadaCartola']);
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



}
