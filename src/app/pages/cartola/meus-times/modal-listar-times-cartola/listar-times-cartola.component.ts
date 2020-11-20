import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { Observable } from 'rxjs';

import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TimeCartola } from 'src/app/interfaces/timeCartola';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/services/token.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-listar-times-cartola',
  templateUrl: './listar-times-cartola.component.html',
  styleUrls: ['./listar-times-cartola.component.css']
})
export class ListarTimesCartolaComponent implements OnInit {

  public times = [];

  public timeCadastrado = false;

  usuario$: Observable<Usuario>;
  usuario: Usuario;

  id: number;


  constructor(
    private cadastrarTimeCartolaService: CartolaAPIService,
    private timeUsuarioLogado: CartolaAPIService,
    private usuarioService: UsuarioService,
    private filtro: CartolaAPIService,
    private tokenService: TokenService,
    private _NgbActiveModal: NgbActiveModal
  ) {
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  ngOnInit() {


    this.usuarioService
      .getUsuario()
      .subscribe(usuario => {
        this.id = usuario.id;
      });

    const glbId = this.tokenService.tokenGlobo;
    this.timeUsuarioLogado.buscarTimeUsuarioLogado(glbId).subscribe((timeUsuarioLogado: any[]) => {
      this.times = Object.values(timeUsuarioLogado);
      this.tokenService.resetarTokenGlobo();
    });

  }

  onSubmit() {
  }

  cadastrarTimeCartola(time: TimeCartola): void {
    time.idUsuario = this.id;
    this.cadastrarTimeCartolaService.cadastrarTimeUsuarioCartola(time).subscribe(
      () => {
        this.timeCadastrado = true;
        swal({
          title: 'Cadastrado!',
          text: 'Time cadastrado com sucesso.',
          type: 'success',
          confirmButtonClass: 'btn btn-success',
          buttonsStyling: false
        }).catch(swal.noop);
      },
      (erro) => {
        if (erro.status && erro.status === 409) {
          swal({
            title: 'Cancelado',
            text: 'Time já cadastrado! :)',
            type: 'error',
            confirmButtonClass: 'btn btn-info',
            buttonsStyling: false
          }).catch(swal.noop);
        } else {
          swal({
            title: 'Cancelado',
            text: 'Não foi possível realizar o cadastro do time! :)',
            type: 'error',
            confirmButtonClass: 'btn btn-info',
            buttonsStyling: false
          }).catch(swal.noop);
        }
      }
    );
  }


  close() {
    this.activeModal.close();
    this.filtro.filtro('click');
  }

}
