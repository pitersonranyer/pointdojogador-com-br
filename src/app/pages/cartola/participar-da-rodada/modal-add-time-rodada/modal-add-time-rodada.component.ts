import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RodadaCartola } from 'src/app/interfaces/rodadaCartola';
import { TimeCartola } from 'src/app/interfaces/timeCartola';
import { TimeRodadaCartola } from 'src/app/interfaces/timeRodadaCartola';
import { Usuario } from 'src/app/interfaces/usuario';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-modal-add-time-rodada',
  templateUrl: './modal-add-time-rodada.component.html',
  styleUrls: ['./modal-add-time-rodada.component.css']
})
export class ModalAddTimeRodadaComponent implements OnInit {

  @Input() fromParent;
  usuario: Usuario;
  id: number;
  idRodada: number;
  anoAtual = 2020;
  public rodada: RodadaCartola;
  public timesUsuarioCartola: Array<any> = [];
  public timeRodadaCartola: TimeRodadaCartola = <TimeRodadaCartola>{};

  public listaTimesAdd = [];

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private usuarioService: UsuarioService,
    private consutarRodadaById: CartolaAPIService,
    private cadastrarTimeRodadaCartolaService: CartolaAPIService,
    private listarTimesUsuarioCartolaRodada: CartolaAPIService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  get activeModal() {
    return this._NgbActiveModal;
  }

  ngOnInit() {

    this.idRodada = this.fromParent.idRodada;
    this.usuarioService
      .getUsuario()
      .subscribe(usuario => {
        this.id = usuario.id;
      });

    this.consutarRodadaById.listarRodadaCartolaPorId(this.anoAtual, this.idRodada).subscribe((rodadaCartola: RodadaCartola) => {
      this.rodada = rodadaCartola;

      this.listarTimesUsuarioCartolaRodada
        .listarTimesUsuarioCartolaRodada(this.anoAtual, this.id, this.rodada.idRodada)
        .subscribe((timesCartola) => {
          this.timesUsuarioCartola = timesCartola;
        });

    });


  }

  confirmacao(timeUsuario: TimeCartola) {

    this.timeRodadaCartola.anoTemporada = this.rodada.anoTemporada;
    this.timeRodadaCartola.idRodada = this.rodada.idRodada;
    this.timeRodadaCartola.idUsuario = timeUsuario.idUsuario;
    this.timeRodadaCartola.time_id = timeUsuario.time_id;

    this.cadastrarTimeRodadaCartolaService.cadastrarTimeRodadaCartola(this.timeRodadaCartola)
      .subscribe(
        () => {

          this.toastr.success(
            '<span class="now-ui-icons ui-1_bell-53"></span>' +
            ' Time adicionado com sucesso!',
            '',
            {
              timeOut: 8000,
              closeButton: true,
              enableHtml: true,
              toastClass: 'alert alert-success alert-with-icon',
              positionClass: 'toast-' + 'top' + '-' + 'right'
            }
          );

          this.listarTimesUsuarioCartolaRodada
            .listarTimesUsuarioCartolaRodada(this.rodada.anoTemporada, timeUsuario.idUsuario, this.rodada.idRodada)
            .subscribe((timesCartola) => {
              this.timesUsuarioCartola = timesCartola;
            });
        },
        (erro) => {

          if (erro.status && erro.status === 409) {

            swal({
              title: 'Cancelado',
              text: 'Time já cadastrado nessa rodada! :)',
              type: 'error',
              confirmButtonClass: 'btn btn-info',
              buttonsStyling: false
            }).catch(swal.noop);


          } else {

            swal({
              title: 'Cancelado',
              text: 'Não foi possível realizar o cadastro! :)',
              type: 'error',
              confirmButtonClass: 'btn btn-info',
              buttonsStyling: false
            }).catch(swal.noop);
          }
        });
  }


  addTodosTimes() {
    swal({
      title: 'Deseja adicionar todos os times na Rodada?',
      text: 'Confirmação',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      cancelButtonText: 'Não!',
      confirmButtonText: 'Sim!',
      buttonsStyling: false
    }).then(result => {
      if (result.value) {
        this.spinner.show('rodadaModal');
        this.listarTimesUsuarioCartolaRodada
          .listarTimesUsuarioCartolaRodada(this.rodada.anoTemporada, this.id, this.rodada.idRodada)
          .subscribe((timesCartola) => {
            this.listaTimesAdd = timesCartola;
            for (let i = 0; i < this.listaTimesAdd.length; i++) {
              if (this.listaTimesAdd[i].idRodada === null) {

                this.timeRodadaCartola.anoTemporada = this.rodada.anoTemporada;
                this.timeRodadaCartola.idRodada = this.rodada.idRodada;
                this.timeRodadaCartola.idUsuario = this.id;
                this.timeRodadaCartola.time_id = this.listaTimesAdd[i].time_id;

                this.cadastrarTimeRodadaCartolaService.cadastrarTimeRodadaCartola(this.timeRodadaCartola)
                  .subscribe(() => {

                  });
              }
            }
          });

        setTimeout(() => {
          this.spinner.hide('rodadaModal');
          this.timesUsuarioCartola = [];
          this.listarTimesUsuarioCartolaRodada
            .listarTimesUsuarioCartolaRodada(this.rodada.anoTemporada, this.id, this.rodada.idRodada)
            .subscribe((timesCartola) => {
              this.timesUsuarioCartola = timesCartola;
            });
        }, 6000);

        this.toastr.success(
          '<span class="now-ui-icons ui-1_bell-53"></span>' +
          ' Times adicionados com sucesso!',
          '',
          {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-success alert-with-icon',
            positionClass: 'toast-' + 'top' + '-' + 'right'
          });


      } else {
        swal({
          title: 'Cancelado',
          text: 'Operação cancelada',
          type: 'error',
          confirmButtonClass: 'btn btn-info',
          buttonsStyling: false
        }).catch(swal.noop);
      }
    });




  }
}
