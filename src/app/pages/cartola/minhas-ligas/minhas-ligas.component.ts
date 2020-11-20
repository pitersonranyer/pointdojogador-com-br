import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-minhas-ligas',
  templateUrl: './minhas-ligas.component.html',
  styleUrls: ['./minhas-ligas.component.css']
})
export class MinhasLigasComponent implements OnInit, OnDestroy {

  public meusJogos = [];
  id: number;
  closeResult: string;
  parciais = [];
  times = [];

  constructor(private usuarioService: UsuarioService,
    private jogosService: CartolaAPIService,
    private listarTimesUsuarioRodada: CartolaAPIService,
    private listaResultadoParcialRodada: CartolaAPIService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.usuarioService
      .getUsuario()
      .subscribe(usuario => {
        this.id = usuario.id;
      });

    this.jogosService.listaMeusJogosMeusPgtos(this.id).subscribe(data => {
      this.meusJogos = data;
    });
  }
  ngOnDestroy() {
  }


  open(content, meuJogo: any, tipo: String) {
    this.times = [];
    this.parciais = [];

    if (tipo === '1') {
      this.listarTimesUsuarioRodada.listarTimesUsuarioRodada(meuJogo.anoTemporada, meuJogo.idRodada, this.id,)
        .subscribe((timesCartola: []) => {
          this.times = timesCartola;
        });
    } else {
      this.listaResultadoParcialRodada.listaResutaldoParcialRodada(meuJogo.anoTemporada, meuJogo.idRodada)
        .subscribe((resultParcial: any[]) => {
          this.parciais = resultParcial;
        });
    }

    this.modalService.open(content).result.then(
      result => {

        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
