import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { CartolaAPIService } from 'src/app/services/cartola-api.service';

@Component({
  selector: 'app-consultar-bilhete',
  templateUrl: './consultar-bilhete.component.html',
  styleUrls: ['./consultar-bilhete.component.css']
})
export class ConsultarBilheteComponent implements OnInit {


  results$: Observable<any>;

  formulario = new FormGroup({
    codigoBilhete: new FormControl()
  })

  count = 0
  nomeLigaOne = '';
  tipoCompeticaoOne = '';
  nrRodadaOne = 0;
  listas = [];
  valorBilheteFormat = '';
  codigoBilheteOne = ''
  totalParticipantes = 0;
  premiacaoTotal = 0;
  premiacaoPercentual = 0;
  premiacaoFinalFormat = '';
  countParticipantes = 0;


  constructor(private consultarTimeBilhetePorCodigoService: CartolaAPIService,
    private countRodadaAtual: CartolaAPIService) { }

  ngOnInit() {

    this.results$ = this.formulario.get('codigoBilhete').valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => value.length > 3),
        debounceTime(200),
        switchMap(value => this.consultarTimeBilhetePorCodigoService
          .consultarTimeBilhetePorCodigo(value)
        ),
        

      );

    this.results$.subscribe(result => {
      this.count = result.length
      this.listas = result;
      this.nomeLigaOne = result[0].nomeLiga;
      this.tipoCompeticaoOne = result[0].tipoCompeticao;
      this.nrRodadaOne = result[0].nrRodada;
      let valorBilhete = result[0].valorCompeticao * this.count
      this.valorBilheteFormat = valorBilhete.toLocaleString('pt-br', { minimumFractionDigits: 2 });
      this.codigoBilheteOne = result[0].codigoBilhete;

      this.totalParticipantes = 20;
      let premiacaoFinal = 2500;
      this.premiacaoFinalFormat = premiacaoFinal.toLocaleString('pt-br', { minimumFractionDigits: 2 });

   //   console.log

   //   this.countRodadaAtual.consultaTimeCompeticaoCount(result[0].nrSequencialRodadaCartola)
   //       .subscribe((data: number) => {
   //         this.countParticipantes = data;
   //         console.log(this.countParticipantes);
   //         
   //         this.totalParticipantes = this.countParticipantes;
   //         this.premiacaoTotal = this.totalParticipantes * result[0].valorCompeticao;
   //         this.premiacaoPercentual = (this.premiacaoTotal * result[0].txAdm) / 100;
   //         let premiacaoFinal = this.premiacaoTotal - this.premiacaoPercentual;
   //         this.premiacaoFinalFormat = premiacaoFinal.toLocaleString('pt-br', { minimumFractionDigits: 2 });
   
   //       });

    });

    


  }
  
  limpar() {
    this.count = 0;
    this.nomeLigaOne = '';
    this.tipoCompeticaoOne = '';
    this.nrRodadaOne = 0;
    this.valorBilheteFormat = '';
    this.codigoBilheteOne = '';
    this.formulario.reset();
    this.ngOnInit();
  }

}
