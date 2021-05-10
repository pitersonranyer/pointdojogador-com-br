import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';

@Component({
  selector: 'app-consultar-bilhete-codigo',
  templateUrl: './consultar-bilhete-codigo.component.html',
  styleUrls: ['./consultar-bilhete-codigo.component.css']
})
export class ConsultarBilheteCodigoComponent implements OnInit {


  results$: Observable<any>;

  formulario = new FormGroup({
    codigoBilhete: new FormControl()
  })

  count = 0
  nomeLigaOne = '';
  tipoCompeticaoOne = '';
  nrRodadaOne = 0;
  listas = [];
  valorBilheteFormat = '';
  codigoBilheteOne = ''
  totalParticipantes = 0;
  premiacaoTotal = 0;
  premiacaoPercentual = 0;
  premiacaoFinalFormat = '';
  countParticipantes = 0;
  nomeUsuarioOne = '';
  nomeAdmOne = '';
  codigoBilheteUrl = ''

  constructor(private consultarTimeBilhetePorCodigoService: CartolaAPIService,
    private countRodadaAtual: CartolaAPIService,
    private dadosUsuarioService: CartolaAPIService,
    private route: ActivatedRoute ,
    private toastr: ToastrService) { 
      this.route.params.subscribe(params => this.codigoBilheteUrl = params['codigoBilhete']);
    }

  ngOnInit() {
    this.formulario.get('codigoBilhete').setValue(this.codigoBilheteUrl);
    this.atualizarConsultaBilhete();
  }

  pesquisar() {
    this.atualizarConsultaBilhete();
  }

  atualizarConsultaBilhete(){
    this.consultarTimeBilhetePorCodigoService
      .consultarTimeBilhetePorCodigo(this.formulario.get('codigoBilhete').value)
      .subscribe((result: any) => {
        if (result.length) {
          this.count = result.length
          this.listas = result;
          this.nomeLigaOne = result[0].nomeLiga;
          this.tipoCompeticaoOne = result[0].tipoCompeticao;
          this.nrRodadaOne = result[0].nrRodada;
          let valorBilhete = result[0].valorCompeticao * this.count
          this.valorBilheteFormat = valorBilhete.toLocaleString('pt-br', { minimumFractionDigits: 2 });
          this.codigoBilheteOne = result[0].codigoBilhete;
          this.nomeUsuarioOne = result[0].nomeUsuario;

          this.dadosUsuarioService.consultarUsuario(result[0].idUsuarioAdmLiga)
            .subscribe((usu: any) => {
              this.nomeAdmOne = usu.nome;
            });

          this.countRodadaAtual.consultaTimeCompeticaoCount(result[0].nrSequencialRodadaCartola)
            .subscribe((data: number) => {
              this.countParticipantes = data;

              this.totalParticipantes = this.countParticipantes;
              this.premiacaoTotal = this.totalParticipantes * result[0].valorCompeticao;
              this.premiacaoPercentual = (this.premiacaoTotal * result[0].txAdm) / 100;
              let premiacaoFinal = this.premiacaoTotal - this.premiacaoPercentual;
              this.premiacaoFinalFormat = premiacaoFinal.toLocaleString('pt-br', { minimumFractionDigits: 2 });

            });
        } else {
          this.toastr.info(
            '<span class="now-ui-icons ui-1_bell-53"></span>' +
            ' Bilhete não encontrado!',
            '',
            {
              timeOut: 8000,
              closeButton: true,
              enableHtml: true,
              toastClass: 'alert alert-info alert-with-icon',
              positionClass: 'toast-' + 'top' + '-' + 'right'
            }
          );
        }
      });

  }

  limpar() {
    this.count = 0;
    this.nomeLigaOne = '';
    this.tipoCompeticaoOne = '';
    this.nrRodadaOne = 0;
    this.valorBilheteFormat = '';
    this.codigoBilheteOne = '';
    this.formulario.reset();
    this.codigoBilheteUrl = '';
    this.ngOnInit();
  }

}
