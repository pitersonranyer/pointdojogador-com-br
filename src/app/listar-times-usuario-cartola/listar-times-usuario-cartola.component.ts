import { Component, OnInit, ViewChild } from '@angular/core';
import { CartolaAPIService } from '../services/cartola-api.service';
import { TimeCartola } from '../interfaces/timeCartola';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Observable } from 'rxjs';

import { DialogService } from 'primeng/api';
import { LoginGloboComponent } from '../login-globo/login-globo.component';

@Component({
  selector: 'app-listar-times-usuario-cartola',
  templateUrl: './listar-times-usuario-cartola.component.html',
  styleUrls: ['./listar-times-usuario-cartola.component.css']
})
export class ListarTimesUsuarioCartolaComponent implements OnInit {

  public times: TimeCartola[];

  usuario$: Observable<Usuario>;
  usuario: Usuario;

  id: number;

  constructor(private listarTimesUsuarioCartola: CartolaAPIService,
    private filtro: CartolaAPIService,
    public usuarioService: UsuarioService,
    private router: Router,
    private dialogService: DialogService
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

  onSubmit() {

  }

  consultarTimeCartola(time: TimeCartola): void {
    this.router.navigate(['/consultaTimeCartola'], { queryParams: time });
  }

  cadastrarTimeCartola(): void {
    this.router.navigate(['/timeCartola']);
  }

  showGlobo() {

    this.dialogService.open(LoginGloboComponent, {
      contentStyle: {
        overflow: 'auto',
        backgroundColor: '#fff',
        'min-width': '300px',
        'min-height': '100px'
      },
      dismissableMask: true
    });
  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }

}
