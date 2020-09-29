import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { TimeCartola } from 'src/app/interfaces/timeCartola';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { MensageriaService } from 'src/app/services/mensageria.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-modal-detalhe-time-usuario-rodada',
  templateUrl: './modal-detalhe-time-usuario.component.html',
  styleUrls: ['./modal-detalhe-time-usuario.component.css']
})
export class ModalDetalheTimeUsuarioComponent implements OnInit {
  idTime: number;
  capitao_id: number;
  pontuacaoParcial: number;

  time: TimeCartola;
  scout = [];
  elementos = '';
  atletas: Array<any> = [];
  atletas2: Array<any> = [];
  arrayAtletasPontuados = [];

  constructor(
    public activeModal: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private consultarTimeCartola: CartolaAPIService,
    private atletasPontuados: CartolaAPIService,
    private ordernar: UtilService,
    public mensageria: MensageriaService

  ) { this.time = config.data.time; }

  ngOnInit() {

    this.mensageria.processamento = true;

    this.idTime = this.time.time_id;
    

    this.consultarTimeCartola.consultarTimeCartola(this.idTime).subscribe((data) => {

      this.atletas = this.ordernar.ordenarObjetoArray(data.atletas, 'posicao_id');

      // this.time = data.time;
      this.capitao_id = data.capitao_id;


      for (let x = 0; x < this.atletas.length; x++) {
        this.elementos = '';
        for (const [i, [key, value]] of Object.entries(Object.entries(data.atletas[x].scout))) {
          this.scout[i] = key + ' ' + value;
          this.elementos = this.scout.join(',');
        }
        this.atletas[x].elementosScout = this.elementos;

        this.atletas[x].capitao = false;
        if (this.capitao_id == data.atletas[x].atleta_id) {
          this.atletas[x].capitao = true;
        }

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
        console.log(pontuados.atletas);

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

        this.pontuacaoParcial = 0;
        console.log('caraaaaaaaai', data.atletas.length);
        for (let x = 0; x < data.atletas.length; x++) {
          for (let i = 0; i < this.arrayAtletasPontuados.length; i++) {
            if (data.atletas[x].atleta_id == this.arrayAtletasPontuados[i].atleta_id) {
              // Dobrar pontuação do capitão
              this.atletas[x].capitao = false;
              if (this.capitao_id == data.atletas[x].atleta_id) {
                this.atletas[x].capitao = true;
                this.pontuacaoParcial = this.arrayAtletasPontuados[i].pontuacao * 2;
              } else {
                this.pontuacaoParcial = this.arrayAtletasPontuados[i].pontuacao;
              }
              data.atletas[x].pontos_num = this.pontuacaoParcial;

              this.elementos = '';
              for (const [ix, [key, value]] of Object.entries(Object.entries(this.arrayAtletasPontuados[i].scout))) {
                this.scout[ix] = key + ' ' + value;
                this.elementos = this.scout.join(',');
              }
              this.atletas[x].elementosScout = this.elementos;

              this.atletas[x].foto = this.arrayAtletasPontuados[i].foto.replace('FORMATO', '140x140');

              // finalizar leitura array interno.
              i = this.arrayAtletasPontuados.length;
            }
          }
        }

      });
    });
    this.mensageria.processamento = false;
  }




  close() {
    this.activeModal.close();
  }
}