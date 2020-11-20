import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { TokenService } from 'src/app/services/token.service';
import { ListarTimesCartolaComponent } from '../modal-listar-times-cartola/listar-times-cartola.component';


@Component({
  selector: 'app-login-globo',
  templateUrl: './login-globo.component.html',
  styleUrls: ['./login-globo.component.css']
})
export class LoginGloboComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private login: CartolaAPIService,
    private tokenService: TokenService,
    private _NgbActiveModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastr: ToastrService) {

  }

  get activeModal() {
    return this._NgbActiveModal;
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
      this.toastr.info(
        '<span class="now-ui-icons ui-1_bell-53"></span>' +
        'Bem vindo <b> ao Point do Jogador</b>' +
        ' - Insira seu usuário e senha do Cartalo FC',
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

  realizarLoginCartola(): void {

    this.login.loginCartola(this.formulario.get('usuario').value, this.formulario.get('senha').value).subscribe(
      (resToken: any) => {

        this.tokenService.tokenGlobo = resToken.glbId;

        this.activeModal.close();

        this.modalService.open(ListarTimesCartolaComponent,
          {
            scrollable: true,
            windowClass: 'modal-job-scrollable'
          });

        //        Login realizado com sucesso
      },
      (erro) => {
        
        if (erro.status && erro.status === 400) {
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
            ' - Servidor indisponível, tente novamente mais tarde.',
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


  close() {

  }

}
