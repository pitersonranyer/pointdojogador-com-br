import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../interfaces/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  public usuarios: Usuario[];
  httpsWapp = 'https://wa.me/55';
  nrWapp = '';
  urlWapp = [];

  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit() {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe((users: any[]) => {
      this.usuarios = users;
      for (let x = 0; x < this.usuarios.length; x++) {
        this.nrWapp = this.usuarios[x].contato.replace('(', '').replace(')', '').replace('-', '');
        this.urlWapp[x] = this.httpsWapp + this.nrWapp  ;
      }
    }, () => {
  //    this.toastr.error('Falha listar jogos.', 'Falha!');
    });
  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }

}
