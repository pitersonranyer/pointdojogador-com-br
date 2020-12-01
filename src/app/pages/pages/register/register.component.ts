import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TimesService } from 'src/app/services/times.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public focus;
  public focus2;
  public focus3;
  public focus4;
  public focus5;

  public times = [];
  public usuario: Usuario = <Usuario>{};
  public termoUsuario = false;


  constructor(
    private timesService: TimesService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.timesService.listartimes().subscribe(data => {
      this.times = data;
    });
  }

  onSubmit() {

    this.usuario.saldo = 0;

    if (this.usuario.email === 'pitersonranyer@gmail.com') {
      this.usuario.admin = true;
    } else {
      this.usuario.admin = false;
    }

    if (this.usuario.timeFavorito === 'Selecione...' || this.usuario.timeFavorito === ' ') {
      this.toastr.info(
        '<span class="now-ui-icons ui-1_bell-53"></span>' +
        'Bem vindo <b> ao Point do Jogador</b>' +
        ' - Infome seu time favorito!',
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
      this.usuarioService.cadastrar(this.usuario).subscribe(
        () => {
          this.authService.logar(this.usuario).subscribe(() => {
            this.toastr.success(
              '<span class="now-ui-icons ui-1_bell-53"></span>' +
              'Bem vindo <b> ao Point do Jogador</b>' +
              ' - Cadastro realizado com Sucesso!',
              '',
              {
                timeOut: 8000,
                closeButton: true,
                enableHtml: true,
                toastClass: 'alert alert-success alert-with-icon',
                positionClass: 'toast-' + 'top' + '-' + 'right'
              }
            );
          });
        },
        (erro) => {
          if (erro.status && erro.status === 409) {
            this.toastr.error(
              '<span class="now-ui-icons ui-1_bell-53"></span>' +
              'Bem vindo <b> ao Point do Jogador</b>' +
              ' - Usuário já cadastrado. Experimente utilizar outro e-mail!',
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
              ' Bem vindo <b> ao Point do Jogador</b>' +
              ' - Não foi possível realizar cadastro.!',
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


  ngOnDestroy() {
    var $page = document.getElementsByClassName('full-page')[0];
    $page.classList.remove('register-page');
  }


}
