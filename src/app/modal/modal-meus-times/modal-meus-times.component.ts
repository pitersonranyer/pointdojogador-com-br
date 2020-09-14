import { Component, OnInit } from '@angular/core';
import { TimesService } from '../../services/times.service';
import { DynamicDialogRef } from 'primeng/api';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TimeCartola } from 'src/app/interfaces/timeCartola';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';



@Component({
  selector: 'app-modal-meus-times',
  templateUrl: './modal-meus-times.component.html',
  styleUrls: ['./modal-meus-times.component.css']
})
export class ModalMeusTimesComponent implements OnInit {
  public times: TimeCartola[];

  usuario$: Observable<Usuario>;
  usuario: Usuario;

  id: number;


  constructor(private listarTimesUsuarioCartola: CartolaAPIService,
    public activeModal: DynamicDialogRef,
    public usuarioService: UsuarioService) { }

  ngOnInit() {

    this.usuarioService
      .getUsuario()
      .subscribe(usuario => {
        this.id = usuario.id;
      });

    this.listarTimesUsuarioCartola.listarTimesUsuarioCartola(this.id).subscribe((timesCartola: TimeCartola[]) => {
      this.times = timesCartola;
    });
  }

  close() {
    this.activeModal.close();
  }

}
