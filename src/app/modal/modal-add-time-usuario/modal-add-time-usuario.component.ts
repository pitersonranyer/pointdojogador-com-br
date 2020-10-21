import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TimeCartola } from 'src/app/interfaces/timeCartola';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { MensageriaService } from 'src/app/services/mensageria.service';

@Component({
  selector: 'app-modal-add-time-usuario',
  templateUrl: './modal-add-time-usuario.component.html',
  styleUrls: ['./modal-add-time-usuario.component.css']
})
export class ModalAddTimeUsuarioComponent implements OnInit {
  public times: TimeCartola[];

  timesCartola = [];

  idUsuario: number;

  nomeTimeBusca: string;

  constructor(private listarTimesUsuarioCartola: CartolaAPIService,
    private listarTimesCartola: CartolaAPIService,
    private cadastrarTimeCartolaService: CartolaAPIService,
    public activeModal: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public mensageria: MensageriaService,
    public usuarioService: UsuarioService) { this.idUsuario = config.data.idUsuario; }

  ngOnInit() {
    this.atualizarListaTimesUsuario();
    }

  atualizarListaTimesUsuario() {
    this.listarTimesUsuarioCartola.listarTimesUsuarioCartola(this.idUsuario).subscribe((timesCartola: TimeCartola[]) => {
      this.times = timesCartola;
    });
  }

  listarTimesPorNome(nomeTime: string) {
    this.listarTimesCartola.listarTimesCartola(nomeTime).subscribe((listaTimes: []) => {
      this.timesCartola = listaTimes;
    });
  }

  cadastrarTimeCartola(time: TimeCartola): void {
    time.idUsuario = this.idUsuario;
    this.cadastrarTimeCartolaService.cadastrarTimeUsuarioCartola(time).subscribe(
      () => {
        this.mensageria.processamento = false;
        this.mensageria.setMensagemSucesso();
        this.timesCartola = [];
        this.atualizarListaTimesUsuario();
      },
      (erro) => {
        this.mensageria.processamento = false;
        if (erro.status && erro.status === 409) {
          this.mensageria.setMensagemAlerta(false, true, 'Time já cadastrado!');
        } else {
          this.mensageria.setMensagemAlerta(false, true, 'Não foi possível realizar o cadastro do time!');
        }
      });
  }



  close() {
    this.activeModal.close();
  }

}
