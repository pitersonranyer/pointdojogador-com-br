import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../interfaces/usuario';
import { DialogService } from 'primeng/api';
import { PerfilUsuarioAlterarSenhaComponent } from '../modal/perfil-usuario-alterar-senha/perfil-usuario-alterar-senha.component';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {


  usuario$: Observable<Usuario>;
  usuario: Usuario;

  constructor(public usuarioService: UsuarioService,
    private dialogService: DialogService) {
    this.usuario$ = usuarioService.getUsuario();
    this.usuario$.subscribe(usuario => this.usuario = usuario);
  }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    const dados = `
      Codigo: ${form.value.codigo}`;

  }

  show() {

   const user =  this.usuario;
    this.dialogService.open(PerfilUsuarioAlterarSenhaComponent,   {
      contentStyle: {
        overflow: 'auto',
        backgroundColor: '#fff',
        'min-width': '300px',
        'min-height': '100px'
      },
      dismissableMask: true,
      data: { user },
      header: 'Informe a nova Senha'
    });
  }

}
