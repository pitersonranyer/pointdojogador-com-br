import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private focus;
  private focus2;

  formulario: FormGroup;

  public usuario: Usuario = <Usuario>{};

  constructor(private router: Router,
    private toastr: ToastrService,
    private authService: AuthService) {}

  ngOnInit() {

    this.formulario = new FormGroup({
      email: new FormControl(null, Validators.required),
      senha: new FormControl(null, Validators.required)
    });

    var $page = document.getElementsByClassName('full-page')[0];
    var image_src;
    var image_container = document.createElement('div');
    image_container.classList.add('full-page-background');
    image_container.style.backgroundImage = 'url(assets/img/bg17.jpg)';
    $page.appendChild(image_container);
    $page.classList.add('login-page');

  }


  onSubmit() {

    if (this.formulario.valid) {
      this.efetuarLogin();
    } else {
      this.toastr.info(
        '<span class="now-ui-icons ui-1_bell-53"></span>' +
        'Bem vindo <b> ao Point do Jogador</b>' +
        ' - Insira usuário e senha.',
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

  efetuarLogin() {
    this.usuario.email = this.formulario.get('email').value;
    this.usuario.senha = this.formulario.get('senha').value;
    this.authService.logar(this.usuario).subscribe(
      () => {
        this.toastr.success(
          '<span class="now-ui-icons ui-1_bell-53"></span>' +
          'Bem vindo <b> ao Point do Jogador</b>' +
          ' - Login realizado com Sucesso!',
          '',
          {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-success alert-with-icon',
            positionClass: 'toast-' + 'top' + '-' + 'right'
          }
        );
        this.router.navigate(['']);
      },
      (erro) => {
        if (erro.status && erro.status === 401) {
          this.toastr.error(
            '<span class="now-ui-icons ui-1_bell-53"></span>' +
            'Bem vindo <b> ao Point do Jogador</b>' +
            ' - E-mail e/ou senha incorreto!',
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
            'Bem vindo <b> ao Point do Jogador</b>' +
            ' - Servidor indisponível, contate o suporte técnico.',
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
      });
  }


  ngOnDestroy() {
    var $page = document.getElementsByClassName('full-page')[0];
    $page.classList.remove('login-page');
  }
}
