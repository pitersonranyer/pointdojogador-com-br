import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../interfaces/usuario';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  public usuario: Usuario = <Usuario>{};

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() { }

     onSubmit(form: NgForm) {
      const dados = `
      Codigo: ${form.value.codigo}`;

    }

}
