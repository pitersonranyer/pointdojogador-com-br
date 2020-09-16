import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../interfaces/usuario';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {


  usuario$: Observable<Usuario>;
  usuario: Usuario;

  constructor(public usuarioService: UsuarioService) {
    this.usuario$ = usuarioService.getUsuario();
    this.usuario$.subscribe(usuario => this.usuario = usuario);
  }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    const dados = `
      Codigo: ${form.value.codigo}`;

  }

}
