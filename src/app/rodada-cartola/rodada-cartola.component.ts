import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CartolaAPIService } from '../services/cartola-api.service';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Observable } from 'rxjs';
import { RodadaCartola } from '../interfaces/rodadaCartola';


import { ConfirmationService } from 'primeng/primeng';
import { Router } from '@angular/router';


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
    private confirmationService: ConfirmationService,
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
    this.router.navigate(['/cadastrarRodadaCartola']);

  }


  alterarStautsRodada(rodada: RodadaCartola): void {

    this.confirmationService.confirm({
      message: 'Tem certeza que deseja alterar o status dessa Rodada?',
      header: 'Confirmação',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.atualizarStatusRodada.atualizarStatusRodada(rodada).subscribe(
          () => {
            console.log('alteração realizado com sucesso');
            this.atualizarListaRodadaCartola();
            //  this.toastr.success('Cadastro realizado com sucesso', 'Show!');
          },
          (erro) => {
            if (erro.status && erro.status === 404) {
              console.log('Alteração não efetuada, registro inexistente');
              //   this.toastr.error('Palpite já cadastrado.', 'Falha!');
            } else {
              console.log('Não foi possível realizar a atualização do status');
              //  this.toastr.error('Não foi possível realizar o cadastro o palpite.', 'Falha!');
            }
          }
        );
      }, reject: () => {
        return;
      }
    });
  }

  excluirRodadaCartola(rodada: RodadaCartola): void {
    console.log(rodada);

    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir essa Rodada?',
      header: 'Confirmação',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.excluirRodadaCartolaPorId.excluirRodadaCartolaPorId(rodada.anoTemporada, rodada.idRodada).subscribe(
          () => {
            console.log('exclusao realizado com sucesso');
            this.atualizarListaRodadaCartola();
            //  this.toastr.success('Cadastro realizado com sucesso', 'Show!');
          },
          (erro) => {
            if (erro.status && erro.status === 404) {
              console.log('Exclusão não efetuada, registro inexistente');
              //   this.toastr.error('Palpite já cadastrado.', 'Falha!');
            } else {
              console.log('Não foi possível realizar a exclusão do time');
              //  this.toastr.error('Não foi possível realizar o cadastro o palpite.', 'Falha!');
            }
          }
        );
      }, reject: () => {
        return;
      }
    });

  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }

}
