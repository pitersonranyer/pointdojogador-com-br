import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem, InputMask } from 'primeng/primeng';
import { Usuario } from '../interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { TimesService } from 'src/app/services/times.service';
import { Time } from '../interfaces/time';
import { MensageriaService } from '../services/mensageria.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  @ViewChild('myInputMask') myInputMask: InputMask;

  public usuario: Usuario = <Usuario>{};
  public termoUsuario = false;
  public times = [];
  timeArray: SelectItem[];
  public timeFavorito: Time = <Time>{};

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    public mensageria: MensageriaService,
    private timesService: TimesService
  ) { }

  ngOnInit() {

    this.timesService.listartimes().subscribe(data => {
      this.times = data;
      this.timeArray = this.times;
    });
  }

  onSubmit() {

    this.usuario.saldo = 0;

    if (this.usuario.email === 'pitersonranyer@gmail.com') {
      this.usuario.admin = true;
    } else {
      this.usuario.admin = false;
    }

    if (this.usuario.timeFavorito === 'Selecione...' || this.usuario.timeFavorito === ' ' ) {
      this.mensageria.setMensagemAlerta(false, true, 'Infome seu time favorito!');
    } else {
      this.usuarioService.cadastrar(this.usuario).subscribe(
        () => {
          this.authService.logar(this.usuario).subscribe(() => {
            this.mensageria.setMensagemSucesso();
          });
        },
        (erro) => {
          if (erro.status && erro.status === 409) {
            this.mensageria.setMensagemAlerta(false, true, 'Usuário já cadastrado. Experimente utilizar outro e-mail!');
          } else {
            this.mensageria.setMensagemAlerta(false, true, 'Não foi possível realizar cadastro.');
          }
        }
      );
    }

  }

}

