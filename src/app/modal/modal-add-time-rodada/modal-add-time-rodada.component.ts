import { Component, OnInit } from '@angular/core';
import { TimeCartola } from '../../interfaces/timeCartola';
import { Usuario } from '../../interfaces/usuario';
import { Observable } from 'rxjs';
import { CartolaAPIService } from '../../services/cartola-api.service';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

import * as moment from 'moment';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { RodadaCartola } from '../../interfaces/rodadaCartola';
import { TimeRodadaCartola } from '../../interfaces/timeRodadaCartola';
import { MensageriaService } from 'src/app/services/mensageria.service';

@Component({
  selector: 'app-modal-add-time-rodada',
  templateUrl: './modal-add-time-rodada.component.html',
  styleUrls: ['./modal-add-time-rodada.component.css']
})
export class ModalAddTimeRodadaComponent implements OnInit {

  timestamp = '';
  anoAtual = 2020;

  public rodada: RodadaCartola;

  public timesUsuarioCartola: Array<any> = [];
  public timeRodadaCartola: TimeRodadaCartola = <TimeRodadaCartola>{};

  public timePesquisa: string;

  usuario$: Observable<Usuario>;
  usuario: Usuario;

  id: number;

  idRodada: number;

  constructor(private consutarRodadaById: CartolaAPIService,
    private listarTimesUsuarioCartolaRodada: CartolaAPIService,
    private cadastrarTimeRodadaCartolaService: CartolaAPIService,
    private usuarioService: UsuarioService,
    public mensageria: MensageriaService,
    public activeModal: DynamicDialogRef,
    public config: DynamicDialogConfig,

  ) { this.idRodada = config.data.idRodada; }

  ngOnInit() {

    this.timestamp = moment().format('DD.MM.YYYY HH:mm:ss');

    this.usuarioService
      .getUsuario()
      .subscribe(usuario => {
        this.id = usuario.id;
      });

      console.log(this.idRodada);
    this.consutarRodadaById.listarRodadaCartolaPorId(this.anoAtual, this.idRodada).subscribe((rodadaCartola: RodadaCartola) => {
      this.rodada = rodadaCartola;
      console.log(rodadaCartola);

      this.listarTimesUsuarioCartolaRodada
        .listarTimesUsuarioCartolaRodada(this.anoAtual, this.id, this.rodada.idRodada)
        .subscribe((timesCartola) => {
          this.timesUsuarioCartola = timesCartola;
        });

    });
  }

  onSubmit(): void {
  }

  cadastrarTimeRodadaCartola(timeUsuario: TimeCartola): void {
    this.mensageria.processamento = true;

    this.timeRodadaCartola.anoTemporada = this.rodada.anoTemporada;
    this.timeRodadaCartola.idRodada = this.rodada.idRodada;
    this.timeRodadaCartola.idUsuario = timeUsuario.idUsuario;
    this.timeRodadaCartola.time_id = timeUsuario.time_id;

    this.cadastrarTimeRodadaCartolaService.cadastrarTimeRodadaCartola(this.timeRodadaCartola).subscribe(
      () => {
        this.mensageria.processamento = false;
        this.mensageria.setMensagemSucesso();
        this.listarTimesUsuarioCartolaRodada
          .listarTimesUsuarioCartolaRodada(this.rodada.anoTemporada, timeUsuario.idUsuario, this.rodada.idRodada)
          .subscribe((timesCartola) => {
            this.timesUsuarioCartola = timesCartola;
          });
        //  this.toastr.success('Cadastro realizado com sucesso', 'Show!');
      },
      (erro) => {
        this.mensageria.processamento = false;
        if (erro.status && erro.status === 409) {
          this.mensageria.setMensagemAlerta(false, true, 'Time já cadastrado nessa rodada');
        } else {
          this.mensageria.setMensagemAlerta(false, true, 'Não foi possível realizar o cadastro do time nessa rodada');
          //  this.toastr.error('Não foi possível realizar o cadastro o palpite.', 'Falha!');
        }
      }
    );
  }

  close() {
    this.activeModal.close();
  }
}