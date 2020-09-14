import { Component, OnInit } from '@angular/core';
import { CartolaAPIService } from '../services/cartola-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-consulta-time-cartola',
  templateUrl: './consulta-time-cartola.component.html',
  styleUrls: ['./consulta-time-cartola.component.css']
})
export class ConsultaTimeCartolaComponent implements OnInit {
  idTime: number;
  patrimonio: number;
  pontos: number;
  capitao_id: number;
  pontos_campeonato: number;
  totPontos: number;
  pontuacaoParcial: number;

  time: {};
  scout: {};
  atletas: Array<any> = [];
  arrayAtletasPontuados = [];


  constructor(private consultarTimeCartola: CartolaAPIService,
    private atletasPontuados: CartolaAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private ordernar: UtilService) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.idTime = params.time_id;
    });

    this.consultarTimeCartola.consultarTimeCartola(this.idTime).subscribe((data) => {

      this.atletas = this.ordernar.ordenarObjetoArray(data.atletas, 'posicao_id');

      this.time = data.time;
      this.patrimonio = data.patrimonio;
      this.capitao_id = data.capitao_id;
      this.pontos = data.pontos.toFixed(2);
      this.pontos_campeonato = data.pontos_campeonato;

      for (let x = 0; x < this.atletas.length; x++) {
        // this.atletas[x].foto;
        this.atletas[x].foto = this.atletas[x].foto.replace('FORMATO', '140x140');

        switch (data.atletas[x].posicao_id) {

          case 1:
            this.atletas[x].posicao_lit = 'GOL';
            break;
          case 2:
            this.atletas[x].posicao_lit = 'LAT';
            break;
          case 3:
            this.atletas[x].posicao_lit = 'ZAG';
            break;
          case 4:
            this.atletas[x].posicao_lit = 'MEI';
            break;
          case 5:
            this.atletas[x].posicao_lit = 'ATA';
            break;
          case 6:
            this.atletas[x].posicao_lit = 'TEC';
        }
      }

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
              data.atletas[x].pontos_num = this.pontuacaoParcial;
              this.totPontos += this.pontuacaoParcial;

              // finalizar leitura array interno.
              i = this.arrayAtletasPontuados.length;
            }
          }
        }
        this.totPontos.toFixed(2);
      });
    });
  }


  voltar() {
    this.router.navigate(['/listarTimesUsuarioCartola']);
  }


}



