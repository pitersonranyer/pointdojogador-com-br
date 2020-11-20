import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RodadaCartola } from 'src/app/interfaces/rodadaCartola';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-rodada-cartola',
  templateUrl: './rodada-cartola.component.html',
  styleUrls: ['./rodada-cartola.component.css']
})
export class RodadaCartolaComponent implements OnInit {

  public rodadas: RodadaCartola[];

  public rodadaCartola: RodadaCartola;

  public timePesquisa: string;

  usuario$: Observable<Usuario>;
  usuario: Usuario;

  id: number;

  @ViewChild('f')
  form: NgForm;


  constructor(private listarTodasRodadaCartola: CartolaAPIService,
    private excluirRodadaCartolaPorId: CartolaAPIService,
    private atualizarStatusRodada: CartolaAPIService,
    private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit() {


    this.usuarioService
      .getUsuario()
      .subscribe(usuario => {
        this.id = usuario.id;
      });

    this.atualizarListaRodadaCartola();

  }

  onSubmit() {

  }

  atualizarListaRodadaCartola() {
    this.listarTodasRodadaCartola.listarTodasRodadaCartola().subscribe((rodadasCartola: RodadaCartola[]) => {
      this.rodadas = rodadasCartola;
    });
  }


  cadastrarRodadaCartola(): void {
    this.router.navigate(['/cartola/cadastrarRodadaCartola']);

  }

  listarTimesDaRodada(rodada: RodadaCartola): void {
    this.router.navigate(['/cartola/listarTimesDaRodada'], { queryParams: rodada });
  }


  alterarStautsRodada(rodada: RodadaCartola): void {

    swal({
      title: 'Alterar',
      text: 'Deseja alterar o status dessa Rodada?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(result => {
      if (result.value) {
        this.atualizarStatusRodada.atualizarStatusRodada(rodada).subscribe(
          () => {
            swal({
              title: 'Alterado!',
              text: 'Rodada Alterada com sucesso.',
              type: 'success',
              confirmButtonClass: 'btn btn-success',
              buttonsStyling: false
            }).catch(swal.noop);
            this.atualizarListaRodadaCartola();
          },
          (erro) => {
            if (erro.status && erro.status === 404) {
              swal({
                title: 'Alteração não efetuada',
                text: 'registro inexistente :)',
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

  excluirRodadaCartola(rodada: RodadaCartola): void {

    swal({
      title: 'Excluir',
      text: 'Deseja excluir o status dessa Rodada?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(result => {
      if (result.value) {
        this.excluirRodadaCartolaPorId.excluirRodadaCartolaPorId(rodada.anoTemporada, rodada.idRodada)
        .subscribe(
          () => {
            swal({
              title: 'Excluída!',
              text: 'Rodada Excluída com sucesso.',
              type: 'success',
              confirmButtonClass: 'btn btn-success',
              buttonsStyling: false
            }).catch(swal.noop);
            this.atualizarListaRodadaCartola();
          },
          (erro) => {
            if (erro.status && erro.status === 404) {
              swal({
                title: 'Exclusão não efetuada',
                text: 'registro inexistente :)',
                type: 'error',
                confirmButtonClass: 'btn btn-info',
                buttonsStyling: false
              }).catch(swal.noop);
            } else {
              swal({
                title: 'Exclusão não efetuada',
                text: 'Não foi possível realizar a Exclusão :)',
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
          text: 'Exclusão cancelada :)',
          type: 'error',
          confirmButtonClass: 'btn btn-info',
          buttonsStyling: false
        }).catch(swal.noop);
      }
    });
  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }

}
