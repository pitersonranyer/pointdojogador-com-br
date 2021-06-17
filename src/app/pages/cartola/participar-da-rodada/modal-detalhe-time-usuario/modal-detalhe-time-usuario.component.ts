import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TimeCartola } from 'src/app/interfaces/timeCartola';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-modal-detalhe-time-usuario',
  templateUrl: './modal-detalhe-time-usuario.component.html',
  styleUrls: ['./modal-detalhe-time-usuario.component.css']
})
export class ModalDetalheTimeUsuarioComponent implements OnInit {
  
  capitao_id: number;
  pontuacaoParcial: number;

  time: TimeCartola;
  scout = [];
  elementos = '';
  atletas: Array<any> = [];
  arrayAtletasPontuados = [];
  @Input() fromParent;

  constructor(
    private consultarTimeCartola: CartolaAPIService,
    private atletasPontuados: CartolaAPIService,
    private ordernar: UtilService,
    private _NgbActiveModal: NgbActiveModal
    

  ) {  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  

  ngOnInit() {

    this.time = this.fromParent.time;


    this.atletasPontuados.listarAtletasPontuados()
      .subscribe((pontuados) => {

        this.arrayAtletasPontuados = pontuados;

        this.consultarTimeCartola.consultarTimeCartola(this.time.time_id).subscribe((data) => {

          this.atletas = this.ordernar.ordenarObjetoArray(data.atletas, 'posicao_id');

          this.capitao_id = data.capitao_id;

          for (let x = 0; x < this.atletas.length; x++) {

            this.atletas[x].capitao = false;
            if (this.capitao_id == this.atletas[x].atleta_id) {
              this.atletas[x].capitao = true;
            }

            this.atletas[x].foto =this.atletas[x].foto.replace('FORMATO', '140x140');

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

          this.pontuacaoParcial = 0;

          for (let x = 0; x < this.atletas.length; x++) {
            for (let i = 0; i < this.arrayAtletasPontuados.length; i++) {
              if (this.atletas[x].atleta_id == this.arrayAtletasPontuados[i].atleta_id) {
                // Dobrar pontuação do capitão
                this.atletas[x].capitao = false;
                if (this.capitao_id == this.atletas[x].atleta_id) {
                  this.atletas[x].capitao = true;
                  this.pontuacaoParcial = this.arrayAtletasPontuados[i].pontuacao * 2;
                } else {
                  this.pontuacaoParcial = this.arrayAtletasPontuados[i].pontuacao;
                }
                this.atletas[x].pontos_num = this.pontuacaoParcial;

                // finalizar leitura array interno.
                i = this.arrayAtletasPontuados.length;
              } else{
                this.atletas[x].pontos_num = null ;
              }
            }
          }

        });

      });

  }

}