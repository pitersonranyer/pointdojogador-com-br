import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RodadaCartola } from 'src/app/interfaces/rodadaCartola';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert2';
import { CompeticaoCartola } from 'src/app/interfaces/competicaoCartola';


@Component({
  selector: 'app-rodada-cartola',
  templateUrl: './rodada-cartola.component.html',
  styleUrls: ['./rodada-cartola.component.css']
})
export class RodadaCartolaComponent implements OnInit {

  public rodadas: CompeticaoCartola[];

  public rodadaCartola: CompeticaoCartola;

  public timePesquisa: string;

  usuario$: Observable<Usuario>;
  usuario: Usuario;

  id: number;

  @ViewChild('f')
  form: NgForm;


  constructor(private listarTodasRodadaCartola: CartolaAPIService,
    private excluirRodadaCartolaPorId: CartolaAPIService,
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
    this.listarTodasRodadaCartola.listarCompeticaoCartolaAtivas().subscribe((rodadasCartola: CompeticaoCartola[]) => {
      this.rodadas = rodadasCartola;
    });
  }


  cadastrarRodadaCartola(): void {
    this.router.navigate(['/cartola/cadastrarRodadaCartola']);

  }

  listarTimesDaRodada(rodada: RodadaCartola): void {
    this.router.navigate(['/cartola/listarTimesDaRodada'], { queryParams: rodada });
  }


  excluirRodadaCartola(rodada: CompeticaoCartola): void {

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
        this.excluirRodadaCartolaPorId.excluirCompeticaoCartolaPorId(rodada.nrSequencialRodadaCartola)
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


  alterarRodadaCartola(rodada: CompeticaoCartola): void {
    this.router.navigate(['/cartola/alterarRodadaCartola'], { queryParams: rodada });
  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }

}
