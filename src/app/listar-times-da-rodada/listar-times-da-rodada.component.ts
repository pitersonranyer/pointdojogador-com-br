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

    });

    this.listaResultadoParcialRodada.listaResutaldoParcialRodada(this.anoTemporada, this.idRodada)
      .subscribe((resultParcial: any[]) => {
        this.parciais = resultParcial;

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

    this.ngOnInit();


  }

  voltar() {
    this.router.navigate(['/rodadaCartola']);
  }


}
