import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-atribuir-nova-senha',
  templateUrl: './atribuir-nova-senha.component.html',
  styleUrls: ['./atribuir-nova-senha.component.css']
})
export class AtribuirNovaSenhaComponent implements OnInit {

  @Input() fromParent;
  usuario: Usuario;


  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private atribuirNovaSenha: UsuarioService,
    private toastr: ToastrService,
  ) { }

  get activeModal() {
    return this._NgbActiveModal;
  }

  ngOnInit() {
    this.usuario = this.fromParent.usuario;
  }

  onSubmit() {

    this.atribuirNovaSenha.atribuirNovaSenha(this.usuario).subscribe(
      () => {
        this.toastr.success(
          '<span class="now-ui-icons ui-1_bell-53"></span>' +
          ' Senha alterada com sucesso!',
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
            ' Alteração não efetuada, registro inexistente.',
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
            ' Não foi possível realizar a alteração da senha.',
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
      }
    );

  }

}
