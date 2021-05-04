import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompeticaoCartola } from 'src/app/interfaces/competicaoCartola';
import { Usuario } from 'src/app/interfaces/usuario';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-alterar-rodada-cartola',
  templateUrl: './alterar-rodada-cartola.component.html',
  styleUrls: ['./alterar-rodada-cartola.component.css']
})
export class AlterarRodadaCartolaComponent implements OnInit {

  public rodadaCartola: CompeticaoCartola = <CompeticaoCartola>{};
  public competicao: CompeticaoCartola = <CompeticaoCartola>{};

  usuario: Usuario;

  id: number;

  constructor(private cadastrarRodadaCartola: CartolaAPIService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {

    
  }

  ngOnInit() {

    this.usuarioService
      .getUsuario()
      .subscribe(usuario => {
        this.id = usuario.id;
      });


      this.route.queryParams.subscribe(params => {
        
        this.competicao.nrSequencialRodadaCartola = params.nrSequencialRodadaCartola;
        this.competicao.idUsuarioAdmLiga = params.idUsuarioAdmLiga;
        this.competicao.nomeLiga = params.nomeLiga;

        this.competicao.anoTemporada = params.anoTemporada;
        this.competicao.nrRodada = params.nrRodada;
        this.competicao.dataFimInscricao = params.dataFimInscricao;
        this.competicao.horaFimInscricao = params.horaFimInscricao;
        this.competicao.valorCompeticao = params.valorCompeticao;
        this.competicao.txAdm = params.txAdm;
        this.competicao.statusCompeticao = params.statusCompeticao;
        this.competicao.tipoCompeticao = params.tipoCompeticao;
        this.competicao.linkGrupoWapp = params.linkGrupoWapp;
  
      });

  }

  onSubmit() {

    swal({
      title: 'Alterar',
      text: 'Deseja alterar essa Rodada?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(result => {
      if (result.value) {
        this.rodadaCartola.idUsuarioAdmLiga = this.id;
        this.cadastrarRodadaCartola.alterarCompeticaoCartola(this.competicao).subscribe(
          () => {
            this.toastr.success(
              '<span class="now-ui-icons ui-1_bell-53"></span>' +
              ' Rodada alterada com sucesso!',
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
                title: 'Alteração não efetuada',
                text: 'registro existente :)',
                type: 'error',
                confirmButtonClass: 'btn btn-info',
                buttonsStyling: false
              }).catch(swal.noop);
            } else {
              swal({
                title: 'Alteração não efetuada',
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
