import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TimeCartola } from 'src/app/interfaces/timeCartola';
import { Usuario } from 'src/app/interfaces/usuario';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-modal-add-time-usuario',
  templateUrl: './modal-add-time-usuario.component.html',
  styleUrls: ['./modal-add-time-usuario.component.css']
})
export class ModalAddTimeUsuarioComponent implements OnInit {

  @Input() fromParent;
  usuario: Usuario;
  public times: TimeCartola[];
  timesCartola = [];
  nomeTimeBusca = '';


  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private toastr: ToastrService,
    private listarTimesUsuarioCartola: CartolaAPIService,
    private listarTimesCartola: CartolaAPIService,
    private cadastrarTimeCartolaService: CartolaAPIService
  ) { }

  get activeModal() {
    return this._NgbActiveModal;
  }

  ngOnInit() {
    this.usuario = this.fromParent.usuario;
    this.atualizarListaTimesUsuario();
  }

  atualizarListaTimesUsuario() {
    this.listarTimesUsuarioCartola.listarTimesUsuarioCartola(this.usuario.id).subscribe((timesCartola: TimeCartola[]) => {
      this.times = timesCartola;
    });
  }

  listarTimesPorNome(nomeTime: string) {
    this.listarTimesCartola.listarTimesCartola(nomeTime).subscribe((listaTimes: []) => {
      this.timesCartola = listaTimes;
    });
  }

  cadastrarTimeCartola(time: TimeCartola): void {
    time.idUsuario = this.usuario.id;
    this.cadastrarTimeCartolaService.cadastrarTimeUsuarioCartola(time).subscribe(
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
        this.timesCartola = [];
        this.atualizarListaTimesUsuario();
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

  onSubmit() {
    this.usuario = this.fromParent.usuario;
  }

}
