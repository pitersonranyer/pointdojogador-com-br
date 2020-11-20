import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { TimeCartola } from 'src/app/interfaces/timeCartola';
import { Usuario } from 'src/app/interfaces/usuario';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginGloboComponent } from './modal-login-globo/login-globo.component';

@Component({
  selector: 'app-meus-times',
  templateUrl: './meus-times.component.html',
  styleUrls: ['./meus-times.component.css']
})
export class MeusTimesComponent implements OnInit, OnDestroy {

  public times: TimeCartola[];

  usuario$: Observable<Usuario>;
  usuario: Usuario;

  id: number;


  constructor(private listarTimesUsuarioCartola: CartolaAPIService,
    private filtro: CartolaAPIService,
    public usuarioService: UsuarioService,
    private modalService: NgbModal,
    private router: Router
  ) {

    this.filtro.listen().subscribe((m: any) => {
      this.listarTimesUsuarioCartola.listarTimesUsuarioCartola(this.id).subscribe((timesCartola: TimeCartola[]) => {
        this.times = timesCartola;
      });
    });
  }

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

  showGlobo() {
    this.modalService.open(LoginGloboComponent,
      {
        scrollable: true,
        windowClass: 'modal-job-scrollable'
      });
  }


  ngOnDestroy() {
  }
}
