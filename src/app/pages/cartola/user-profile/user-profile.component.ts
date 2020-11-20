import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalAlterarSenhaComponent } from './modal-alterar-senha/modal-alterar-senha.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  usuario$: Observable<Usuario>;
  usuario: Usuario;


  constructor(public usuarioService: UsuarioService,
    private modalService: NgbModal) {
    this.usuario$ = usuarioService.getUsuario();
    this.usuario$.subscribe(usuario => this.usuario = usuario);
  }

  alterarSenha(usuario: Usuario) {

    const modalRef = this.modalService.open(ModalAlterarSenhaComponent,
      {
        scrollable: true,
        windowClass: 'modal-job-scrollable'
      });

    const data = {
      usuario: usuario
    }

    modalRef.componentInstance.fromParent = data;

  }

  ngOnInit() { }


}
