import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../interfaces/usuario';
import { Router } from '@angular/router';
import { AtribuirNovaSenhaUsuarioComponent } from '../modal/atribuir-nova-senha-usuario/atribuir-nova-senha-usuario.component';
import { DialogService } from 'primeng/api';
import { ModalAddTimeUsuarioComponent } from '../modal/modal-add-time-usuario/modal-add-time-usuario.component';

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
    private router: Router,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe((users: any[]) => {
      this.usuarios = users;
      for (let x = 0; x < this.usuarios.length; x++) {
        this.nrWapp = this.usuarios[x].contato.replace('(', '').replace(')', '').replace('-', '');
        this.urlWapp[x] = this.httpsWapp + this.nrWapp;
      }
    }, () => {
      //    this.toastr.error('Falha listar jogos.', 'Falha!');
    });
  }

  show(usuario: Usuario) {

    this.dialogService.open(AtribuirNovaSenhaUsuarioComponent,   {
      contentStyle: {
        overflow: 'auto',
        backgroundColor: '#fff',
        'min-width': '300px',
        'min-height': '100px'
      },
      dismissableMask: true,
      data: { usuario }
    });
  }

  showTimesUsuario(idUsuario: number) {

    this.dialogService.open(ModalAddTimeUsuarioComponent, {
      contentStyle: {
        overflow: 'auto',
        backgroundColor: '#fff',
        height: '500px'
      },
      dismissableMask: true,
      data: { idUsuario }
    });
  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }

}
