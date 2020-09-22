import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { Usuario } from 'src/app/interfaces/usuario';
import { MensageriaService } from 'src/app/services/mensageria.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil-usuario-alterar-senha',
  templateUrl: './perfil-usuario-alterar-senha.component.html',
  styleUrls: ['./perfil-usuario-alterar-senha.component.css']
})
export class PerfilUsuarioAlterarSenhaComponent implements OnInit {

  usuario: Usuario;

  constructor(public config: DynamicDialogConfig,
    public activeModal: DynamicDialogRef,
    private mensageria: MensageriaService,
    private atribuirNovaSenha: UsuarioService) {
    this.usuario = config.data.user;
  }

  ngOnInit() {

  }

  onSubmit(): void {
    
    this.mensageria.processamento = true;

    this.atribuirNovaSenha.atribuirNovaSenha(this.usuario).subscribe(
      () => {
        this.mensageria.processamento = false;
        this.mensageria.setMensagemSucesso();
      },
      (erro) => {
        this.mensageria.processamento = false;
        if (erro.status && erro.status === 409) {
          this.mensageria.setMensagemAlerta(false, true, 'Alteração não efetuada, registro inexistente');
        } else {
          this.mensageria.setMensagemAlerta(false, true, 'Não foi possível realizar a alteração da senha.');
        }
      }
    );
  }

  close() {
    this.activeModal.close();
  }
}