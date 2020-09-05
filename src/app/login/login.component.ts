import { AuthService } from './../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MensageriaService } from '../services/mensageria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../services/util.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;



  constructor(public mensageria: MensageriaService,
    private router: Router,
    private authService: AuthService,
    public utilService: UtilService,
    private usuarioService: UsuarioService) { }


  ngOnInit() {
    this.formulario = new FormGroup({
      usuario: new FormControl(null, Validators.required),
      senha: new FormControl(null, Validators.required)
    });

    document.body.className = 'login-body';
    // reset login status
    this.authService.logout();
  }

  /**
 * @description Validação realizada antes de submeter formulário
 * @returns void
 */
  onSubmit(): void {
    if (this.formulario.valid) {
      this.realizarLogin();
    } else {
      this.mensageria.setMensagemAlerta(false, true, 'Insira usuário e senha.');
    }
  }

  /**
 * @description Realiza autenticação junto ao backend
 * @returns void
 */
  realizarLogin(): void {
    this.mensageria.processamento = true;
    this.authService.login(this.formulario.get('usuario').value, this.formulario.get('senha').value)
      .subscribe(response => {
        sessionStorage.setItem(btoa('tokenAuth'), btoa('Bearer ' + response['data'].token));
        this.getUsuario();
      },
        error => {
          this.mensageria.processamento = false;
          switch (error['status']) {
            case 403: // Sem acesso
              this.mensageria.setMensagemAlerta(false, true, error['error'].message);
              break;
            case 400:
              this.mensageria.setMensagemAlerta(false, true, error['error'].message);
              break;
            default:
              this.mensageria.setMensagemErroConexao();
              break;
          }
        });
  }

  /**
   * @description Resgata os dados do usuário detentor do login que realizou a autenticação
   * @returns void
   */
  getUsuario(): void {
    const login: string = this.formulario.get('usuario').value;
    this.usuarioService.getByLogin(login.toLowerCase())
      .subscribe(
        response => {
          this.mensageria.processamento = false;
          this.utilService.setUsuarioAutenticado(response['data']);
          sessionStorage.setItem(btoa('userAuth'), btoa(JSON.stringify(response['data'])));
          this.router.navigate(['/inicio']);
        },
        error => {
          sessionStorage.removeItem(btoa('tokenAuth'));
          this.mensageria.setMensagemErro(true, true, 'Erro ao pesquisar dados usuario:', error['error'].message);
          this.mensageria.processamento = false;
        });
  }

}
