import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompeticaoCartola } from 'src/app/interfaces/competicaoCartola';
import { Usuario } from 'src/app/interfaces/usuario';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-cadastrar-rodada-cartola',
  templateUrl: './cadastrar-rodada-cartola.component.html',
  styleUrls: ['./cadastrar-rodada-cartola.component.css']
})
export class CadastrarRodadaCartolaComponent implements OnInit {

  public rodadaCartola: CompeticaoCartola = <CompeticaoCartola>{};

  usuario: Usuario;

  id: number;

  public listaTipoCompeticao = [
    { nomeCompeticao: "TIRO CURTO" },
    { nomeCompeticao: "MENSAL" },
    { nomeCompeticao: "ANUAL" },
    { nomeCompeticao: "1º TURNO" },
    { nomeCompeticao: "2º TURNO" },
    { nomeCompeticao: "ELIMINATORIA" }
    
  ];

  public listaStatus = [
    { nomeStatus: "Aberta" },
    { nomeStatus: "Fechada" },
    { nomeStatus: "Encerrada" }
  ];

  constructor(private cadastrarRodadaCartola: CartolaAPIService,
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService) {

    
  }

  ngOnInit() {

    this.usuarioService
      .getUsuario()
      .subscribe(usuario => {
        this.id = usuario.id;
      });

  }

  onSubmit() {
    this.rodadaCartola.idUsuarioAdmLiga = this.id;
    swal({
      title: 'Cadastrar',
      text: 'Deseja cadastrar essa Rodada?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(result => {
      if (result.value) {
        this.cadastrarRodadaCartola.cadastrarCompeticaoCartola(this.rodadaCartola).subscribe(
          () => {
            this.toastr.success(
              '<span class="now-ui-icons ui-1_bell-53"></span>' +
              ' Rodada Cadastrada com sucesso!',
              '',
              {
                timeOut: 8000,
                closeButton: true,
                enableHtml: true,
                toastClass: 'alert alert-success alert-with-icon',
                positionClass: 'toast-' + 'top' + '-' + 'right'
              }
            );
            this.router.navigate(['/cartola/listarRodadaCartola']);
          },
          (erro) => {
            if (erro.status && erro.status === 409) {
              swal({
                title: 'Cadastro não efetuado',
                text: 'registro existente :)',
                type: 'error',
                confirmButtonClass: 'btn btn-info',
                buttonsStyling: false
              }).catch(swal.noop);
            } else {
              swal({
                title: 'Cadastro não efetuado',
                text: 'Não foi possível realizar a alteração :)',
                type: 'error',
                confirmButtonClass: 'btn btn-info',
                buttonsStyling: false
              }).catch(swal.noop);
            }
          }
        );
      } else {
        swal({
          title: 'Cancelado',
          text: 'Alteração cancelada :)',
          type: 'error',
          confirmButtonClass: 'btn btn-info',
          buttonsStyling: false
        }).catch(swal.noop);
      }
    });
  }
}
