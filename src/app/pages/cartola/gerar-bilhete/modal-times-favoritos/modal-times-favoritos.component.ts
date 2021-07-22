import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BilheteCompeticaoCartola } from 'src/app/interfaces/bilheteCompeticaoCartola';
import { TimeBilheteCompeticaoCartola } from 'src/app/interfaces/timeBilheteCompeticaoCartola';
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

  nomeUsuario = '';
  contatoUsuario = '';
  idBilheteUsuario = 0;
  nrSequencialRodadaCartola = 0
  codigoBilhete = 0;
  retBilheteService: any;

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private listarHistoricoTimesService: CartolaAPIService,
    private consultarTimeInfoCartolaById: CartolaAPIService,
    private excluirHistoricoTimeUsuarioService: CartolaAPIService,
    private gerarBilheteService: CartolaAPIService,
    private cadastrarTimeBilheteService: CartolaAPIService,
    private toastr: ToastrService

  ) { }

  get activeModal() {
    return this._NgbActiveModal;
  }

  ngOnInit() {

    this.contato = this.fromParent.contato;
    this.idBilheteUsuario = this.fromParent.idBilheteUsuario;
    this.nrSequencialRodadaCartola = this.fromParent.nrSequencialRodadaCartola
    this.recuperarLista();

  }

  recuperarLista() {

    this.listarHistoricoTimesService
      .listarHistoricoTimesUsuario(this.contato)
      .subscribe((hstTimes: any) => {
        this.hstTimeUsuario = hstTimes;
        this.nomeUsuario = hstTimes[0].nomeUsuario;
        this.contatoUsuario = hstTimes[0].nrContatoUsuario;
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


  gerarBilheteUsuario(time_id: number): void {
    for (let i = 0; i < this.timesUsuarioCartola.length; i++) {
      if (time_id === this.timesUsuarioCartola[i].time_id) {


        if (this.idBilheteUsuario === 0) {
          this.bilhete.idBilhete = 0;
        } else {
          this.bilhete.idBilhete = this.idBilheteUsuario;
        }

        this.bilhete.nomeUsuario = this.nomeUsuario;
        this.bilhete.nrContatoUsuario = this.contatoUsuario;
        this.bilhete.nrSequencialRodadaCartola = this.nrSequencialRodadaCartola

        this.bilhete.time_id = time_id;
        this.bilhete.assinante = this.timesUsuarioCartola[i].assinante;
        this.bilhete.foto_perfil = this.timesUsuarioCartola[i].foto_perfil;
        this.bilhete.nome = this.timesUsuarioCartola[i].nome;
        this.bilhete.nome_cartola = this.timesUsuarioCartola[i].nome_cartola;
        this.bilhete.slug = this.timesUsuarioCartola[i].slug;
        this.bilhete.url_escudo_png = this.timesUsuarioCartola[i].url_escudo_png;
        this.bilhete.url_escudo_svg = this.timesUsuarioCartola[i].url_escudo_svg;
        this.bilhete.facebook_id = this.timesUsuarioCartola[i].facebook_id;

        this.gerarBilheteService.gerarBilheteCompeticaoCartola(this.bilhete)
          .subscribe(
            (value) => {
              this.retBilheteService = value;
              this.idBilheteUsuario = this.retBilheteService.idBilhete;
              this.codigoBilhete = this.retBilheteService.codigoBilhete;
              this.timesUsuarioCartola[i].inPoint = true;
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
            },
            (erro) => {

              if (erro.status && erro.status === 409) {
                this.toastr.info(
                  '<span class="now-ui-icons ui-1_bell-53"></span>' +
                  'Solcitação não foi gerada, Time já cadastrado!',
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
                  ' Não foi possível gerar a solicitação!',
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


}