import { Component, OnInit } from '@angular/core';
import { CartolaAPIService } from '../services/cartola-api.service';
import { TimeCartola } from '../interfaces/timeCartola';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Observable } from 'rxjs';

import { DynamicDialogRef } from 'primeng/api';
import { TokenService } from '../services/token.service';
import { MensageriaService } from '../services/mensageria.service';


@Component({
  selector: 'app-listar-times-cartola',
  templateUrl: './listar-times-cartola.component.html',
  styleUrls: ['./listar-times-cartola.component.css']
})
export class ListarTimesCartolaComponent implements OnInit {

  // public times: Array<TimeCartola> = [];

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
    private activeModal: DynamicDialogRef,
    private tokenService: TokenService,
    public mensageria: MensageriaService
  ) {
  }

  ngOnInit() {


    this.usuarioService
      .getUsuario()
      .subscribe(usuario => {
        this.id = usuario.id;
      });

    const glbId = this.tokenService.tokenGlobo;
    this.timeUsuarioLogado.buscarTimeUsuarioLogado(glbId).subscribe((timeUsarioLogado: any[]) => {
      this.times = Object.values(timeUsarioLogado);
      this.tokenService.resetarTokenGlobo();
    });

  }

  onSubmit() {
  }

  cadastrarTimeCartola(time: TimeCartola): void {
    this.mensageria.processamento = true;
    time.idUsuario = this.id;
    this.cadastrarTimeCartolaService.cadastrarTimeUsuarioCartola(time).subscribe(
      () => {
        this.mensageria.processamento = false;
        this.mensageria.setMensagemSucesso();

        const glbId = this.tokenService.tokenGlobo;
        this.timeUsuarioLogado.buscarTimeUsuarioLogado(glbId).subscribe((timeUsarioLogado: any[]) => {
          this.times = Object.values(timeUsarioLogado);
          this.timeCadastrado = true;
        });


      },
      (erro) => {
        this.mensageria.processamento = false;
        if (erro.status && erro.status === 409) {
          this.mensageria.setMensagemAlerta(false, true, 'Time já cadastrado!');
        } else {
          this.mensageria.setMensagemAlerta(false, true, 'Não foi possível realizar o cadastro do time!');
        }
      }
    );
  }


  close() {
    this.activeModal.close();
    this.filtro.filtro('click');
  }

}
