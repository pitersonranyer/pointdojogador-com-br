import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AtribuirNovaSenhaComponent } from './modal-atribuir-nova-senha/atribuir-nova-senha.component';
import { ModalAddTimeUsuarioComponent } from './modal-add-time-usuario/modal-add-time-usuario.component';

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
  closeResult: string;
  usuario: Usuario;
  usuarioBusca: string;

  constructor(private usuarioService: UsuarioService,
    private modalService: NgbModal) { }

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

  openModalAddTime(usuario: Usuario) {

    const modalRef = this.modalService.open(ModalAddTimeUsuarioComponent,
      {
        scrollable: true,
        windowClass: 'modal-job-scrollable'
      });

    const data = {
      usuario: usuario
    }

    modalRef.componentInstance.fromParent = data;


  }

  openModalAtriSenha(usuario: Usuario) {
    const modalRef = this.modalService.open(AtribuirNovaSenhaComponent,
      {
        scrollable: true,
        windowClass: 'modal-job-scrollable'
      });

    const data = {
      usuario: usuario
    }

    modalRef.componentInstance.fromParent = data;

  }



}
