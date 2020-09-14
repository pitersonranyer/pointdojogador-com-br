import { Component } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MensageriaService } from '../services/mensageria.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public usuario: Usuario = <Usuario>{};


  constructor(
    private router: Router,
    private authService: AuthService,
    public mensageria: MensageriaService

  ) { 
    document.body.className = 'login-body';
  }

  onSubmit() {

    this.mensageria.processamento = true;
    this.authService.logar(this.usuario).subscribe(
      () => {
        this.router.navigate(['']);
      },
      (erro) => {
         this.mensageria.processamento = false;
        if (erro.status && erro.status === 401) {
          this.mensageria.setMensagemAlerta(false, true, 'E-mail e/ou senha incorreto!');
        } else {
          this.mensageria.processamento = false;
          this.mensageria.setMensagemErroConexao();
        }
      }
    );
  }
}
