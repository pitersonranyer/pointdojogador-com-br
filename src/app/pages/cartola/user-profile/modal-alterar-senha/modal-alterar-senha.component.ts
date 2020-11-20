import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-alterar-senha',
  templateUrl: './modal-alterar-senha.component.html',
  styleUrls: ['./modal-alterar-senha.component.css']
})
export class ModalAlterarSenhaComponent implements OnInit {

  @Input() fromParent;
  usuario: Usuario;
  formulario: FormGroup;

  constructor(
    private atribuirNovaSenha: UsuarioService,
    private _NgbActiveModal: NgbActiveModal,
    private toastr: ToastrService) {

  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  ngOnInit() {

    this.usuario = this.fromParent.usuario;

    this.formulario = new FormGroup({
      senha1: new FormControl(null, Validators.required),
      senha: new FormControl(null, Validators.required)
    });

  }

  onSubmit(): void {
    if (this.formulario.valid) {
      if (this.formulario.value.senha1 !== this.formulario.value.senha) {
        this.toastr.error(
          '<span class="now-ui-icons ui-1_bell-53"></span>' +
          ' <b> Atenção </b>' +
          ' - Senhas não conferem.',
          '',
          {
            timeOut: 8000,
            enableHtml: true,
            closeButton: true,
            toastClass: 'alert alert-danger alert-with-icon',
            positionClass: 'toast-' + 'top' + '-' + 'right'
          }
        );
      } else {
        this.realizarAlteracaoSenha();
      }
    } else {
      this.toastr.error(
        '<span class="now-ui-icons ui-1_bell-53"></span>' +
        ' <b> Atenção </b>' +
        ' - Insira a nova senha.',
        '',
        {
          timeOut: 8000,
          enableHtml: true,
          closeButton: true,
          toastClass: 'alert alert-danger alert-with-icon',
          positionClass: 'toast-' + 'top' + '-' + 'right'
        }
      );
    }

  }

  realizarAlteracaoSenha() {
    this.usuario.senha = this.formulario.value.senha;
    this.atribuirNovaSenha.atribuirNovaSenha(this.usuario).subscribe(
      () => {
        this.toastr.success(
          ' <b> Atenção </b>' +
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
          this.toastr.error(
            '<span class="now-ui-icons ui-1_bell-53"></span>' +
            ' <b> Atenção </b>' +
            ' - Alteração não efetuada, registro inexistente.',
            '',
            {
              timeOut: 8000,
              enableHtml: true,
              closeButton: true,
              toastClass: 'alert alert-danger alert-with-icon',
              positionClass: 'toast-' + 'top' + '-' + 'right'
            }
          );
        } else {
          this.toastr.error(
            '<span class="now-ui-icons ui-1_bell-53"></span>' +
            ' <b> Atenção </b>' +
            ' - Não foi possível realizar a alteração da senha.',
            '',
            {
              timeOut: 8000,
              enableHtml: true,
              closeButton: true,
              toastClass: 'alert alert-danger alert-with-icon',
              positionClass: 'toast-' + 'top' + '-' + 'right'
            }
          );
        }
      }
    );
  }
}