import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BilheteCompeticaoCartola } from 'src/app/interfaces/bilheteCompeticaoCartola';
import { TimeBilheteCompeticaoCartola } from 'src/app/interfaces/timeBilheteCompeticaoCartola';
import { TimeCartola } from 'src/app/interfaces/timeCartola';
import { TimeLigaCartola } from 'src/app/interfaces/timeLigaCartola';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';


@Component({
  selector: 'app-modal-times-favoritos',
  templateUrl: './modal-times-favoritos.component.html',
  styleUrls: ['./modal-times-favoritos.component.css']
})
export class ModalTimesFavoritosComponent implements OnInit {

  @Input() fromParent;

  contato: string;

  public timesUsuarioCartola: Array<any> = [];

  hstTimeUsuario = [];

  bilhete: BilheteCompeticaoCartola = <BilheteCompeticaoCartola>{};
  timeBilhete: TimeBilheteCompeticaoCartola = <TimeBilheteCompeticaoCartola>{};

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private listarHistoricoTimesService: CartolaAPIService,
    private consultarTimeInfoCartolaById: CartolaAPIService,
    private excluirHistoricoTimeUsuarioService: CartolaAPIService
  ) { }

  get activeModal() {
    return this._NgbActiveModal;
  }

  ngOnInit() {

    this.contato = this.fromParent.contato;
    this.recuperarLista();


  }

  recuperarLista() {

    this.listarHistoricoTimesService
      .listarHistoricoTimesUsuario(this.contato)
      .subscribe((hstTimes: any) => {
        this.hstTimeUsuario = hstTimes;
        for (let i = 0; i < this.hstTimeUsuario.length; i++) {
          this.consultarTimeInfoCartolaById.consultarTimeCartola(this.hstTimeUsuario[i].time_id)
            .subscribe((data) => {
              this.timesUsuarioCartola[i] = data.time;
            });
        }
      });
  }

  excluirTimeFavorito(time_id: number): void {
    this.excluirHistoricoTimeUsuarioService.excluirHistoricoTimeUsuario(time_id)
      .subscribe(
        () => {
           this.timesUsuarioCartola = [];
           this.hstTimeUsuario = [];
          this.recuperarLista();
        });
  }


  /* gerarBilheteUsuario(time: TimeLigaCartola): void {
    for (let i = 0; i < this.timesUsuarioCartola.length; i++) {
      if (time.time_id === this.timesUsuarioCartola[i].time_id) {

        if (this.idBilheteUsuario === 0) {
          this.bilhete.idBilhete = 0;
          this.bilhete.nomeUsuario = this.formulario.get('nome').value;
          this.bilhete.nrContatoUsuario = this.formulario.get('contato').value;
          this.bilhete.nrSequencialRodadaCartola = this.competicaoRodada.nrSequencialRodadaCartola
          this.gerarBilhete.gerarBilheteCompeticaoCartola(this.bilhete)

            .subscribe((value: any) => {
              this.idBilheteUsuario = value.idBilhete;
              this.codigoBilhete = value.codigoBilhete;

              this.timeBilhete.idBilhete = this.idBilheteUsuario;
              this.timeBilhete.nomeUsuario = this.formulario.get('nome').value;
              this.timeBilhete.nrContatoUsuario = this.formulario.get('contato').value;
              this.timeBilhete.nrSequencialRodadaCartola = this.competicaoRodada.nrSequencialRodadaCartola

              this.timeBilhete.time_id = this.timesUsuarioCartola[i].time_id;
              this.timeBilhete.assinante = this.timesUsuarioCartola[i].assinante;
              this.timeBilhete.foto_perfil = this.timesUsuarioCartola[i].foto_perfil;
              this.timeBilhete.nome = this.timesUsuarioCartola[i].nome;
              this.timeBilhete.nome_cartola = this.timesUsuarioCartola[i].nome_cartola;
              this.timeBilhete.slug = this.timesUsuarioCartola[i].slug;
              this.timeBilhete.url_escudo_png = this.timesUsuarioCartola[i].url_escudo_png;
              this.timeBilhete.url_escudo_svg = this.timesUsuarioCartola[i].url_escudo_svg;
              this.timeBilhete.facebook_id = this.timesUsuarioCartola[i].facebook_id;

              this.cadastrarTimeBilheteService.cadastrarTimeBilheteCompeticaoCartola(this.timeBilhete)
                .subscribe(
                  () => {
                    this.toastr.success(
                      '<span class="now-ui-icons ui-1_bell-53"></span>' +
                      ' Time cadastrado com sucesso!',
                      '',
                      {
                        timeOut: 8000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: 'alert alert-success alert-with-icon',
                        positionClass: 'toast-' + 'top' + '-' + 'right'
                      }
                    );
                    this.timesUsuarioCartola[i].inPoint = true;
                  },
                  (erro) => {

                    if (erro.status && erro.status === 409) {
                      this.toastr.info(
                        '<span class="now-ui-icons ui-1_bell-53"></span>' +
                        ' Time já cadastrado!',
                        '',
                        {
                          timeOut: 8000,
                          closeButton: true,
                          enableHtml: true,
                          toastClass: 'alert alert-info alert-with-icon',
                          positionClass: 'toast-' + 'top' + '-' + 'right'
                        }
                      );
                    } else {
                      this.toastr.info(
                        '<span class="now-ui-icons ui-1_bell-53"></span>' +
                        ' Não foi possível realizar o cadastro do time!',
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
            });
        } else {
          this.timeBilhete.idBilhete = this.idBilheteUsuario;
          this.timeBilhete.nomeUsuario = this.formulario.get('nome').value;
          this.timeBilhete.nrContatoUsuario = this.formulario.get('contato').value;
          this.timeBilhete.nrSequencialRodadaCartola = this.competicaoRodada.nrSequencialRodadaCartola

          this.timeBilhete.time_id = this.timesUsuarioCartola[i].time_id;
          this.timeBilhete.assinante = this.timesUsuarioCartola[i].assinante;
          this.timeBilhete.foto_perfil = this.timesUsuarioCartola[i].foto_perfil;
          this.timeBilhete.nome = this.timesUsuarioCartola[i].nome;
          this.timeBilhete.nome_cartola = this.timesUsuarioCartola[i].nome_cartola;
          this.timeBilhete.slug = this.timesUsuarioCartola[i].slug;
          this.timeBilhete.url_escudo_png = this.timesUsuarioCartola[i].url_escudo_png;
          this.timeBilhete.url_escudo_svg = this.timesUsuarioCartola[i].url_escudo_svg;
          this.timeBilhete.facebook_id = this.timesUsuarioCartola[i].facebook_id;

          this.cadastrarTimeBilheteService.cadastrarTimeBilheteCompeticaoCartola(this.timeBilhete)
            .subscribe(
              () => {
                this.toastr.success(
                  '<span class="now-ui-icons ui-1_bell-53"></span>' +
                  ' Time cadastrado com sucesso!',
                  '',
                  {
                    timeOut: 8000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: 'alert alert-success alert-with-icon',
                    positionClass: 'toast-' + 'top' + '-' + 'right'
                  }
                );
                this.timesUsuarioCartola[i].inPoint = true;
              },
              (erro) => {

                if (erro.status && erro.status === 409) {
                  this.toastr.info(
                    '<span class="now-ui-icons ui-1_bell-53"></span>' +
                    ' Time já cadastrado!',
                    '',
                    {
                      timeOut: 8000,
                      closeButton: true,
                      enableHtml: true,
                      toastClass: 'alert alert-info alert-with-icon',
                      positionClass: 'toast-' + 'top' + '-' + 'right'
                    }
                  );
                } else {
                  this.toastr.info(
                    '<span class="now-ui-icons ui-1_bell-53"></span>' +
                    ' Não foi possível realizar o cadastro do time!',
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
      }
    }
  } */


}