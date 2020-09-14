import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/api';
import { CartolaAPIService } from '../services/cartola-api.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ListarTimesCartolaComponent } from '../listar-times-cartola/listar-times-cartola.component';
import { TokenService } from '../services/token.service';
import { MensageriaService } from '../services/mensageria.service';


@Component({
  selector: 'app-login-globo',
  templateUrl: './login-globo.component.html',
  styleUrls: ['./login-globo.component.css']
})
export class LoginGloboComponent implements OnInit {

  formulario: FormGroup;

  constructor(private activeModal: DynamicDialogRef,
    private login: CartolaAPIService,
    private tokenService: TokenService,
    private dialogService: DialogService,
    public mensageria: MensageriaService) {

  }

  ngOnInit() {
    this.formulario = new FormGroup({
      usuario: new FormControl(null, Validators.required),
      senha: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      this.realizarLoginCartola();
    } else {
      this.mensageria.setMensagemAlerta(false, true, 'Insira usuário e senha.');
    }
  }

  realizarLoginCartola(): void {
    this.mensageria.processamento = true;
    this.login.loginCartola(this.formulario.get('usuario').value, this.formulario.get('senha').value).subscribe(
      (resToken: any) => {

        this.tokenService.tokenGlobo = resToken.glbId;

        this.activeModal.close();

        this.mensageria.processamento = false;

        this.dialogService.open(ListarTimesCartolaComponent, {
          contentStyle: {
            overflow: 'auto',
            backgroundColor: '#fff',
            'min-width': '300px',
            'min-height': '100px'
          },
          dismissableMask: true
        });
        //        Login realizado com sucesso
      },
      (erro) => {
        this.mensageria.processamento = false;
        if (erro.status && erro.status === 400) {
          this.mensageria.setMensagemAlerta(false, true, 'E-mail e/ou senha incorreto!');
        } else {
          this.mensageria.setMensagemErroConexao();
        }
      }
    );


  }


  close() {
    this.activeModal.close();
    this.tokenService.resetarTokenGlobo();
  }

}
