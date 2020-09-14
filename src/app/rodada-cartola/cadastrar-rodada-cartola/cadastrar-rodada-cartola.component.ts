import { Component, OnInit, ViewChild } from '@angular/core';
import { CartolaAPIService } from '../../services/cartola-api.service';
import { UsuarioService } from '../../services/usuario.service';

import { RodadaCartola } from '../../interfaces/rodadaCartola';


import { ConfirmationService } from 'primeng/primeng';
import { Router } from '@angular/router';
import { MensageriaService } from 'src/app/services/mensageria.service';


@Component({
  selector: 'app-cadastrar-rodada-cartola',
  templateUrl: './cadastrar-rodada-cartola.component.html',
  styleUrls: ['./cadastrar-rodada-cartola.component.css']
})
export class CadastrarRodadaCartolaComponent implements OnInit {

  public rodadaCartola: RodadaCartola = <RodadaCartola>{};

  constructor(private cadastrarRodadaCartola: CartolaAPIService,
    public excluirRodadaCartolaPorId: CartolaAPIService,
    private confirmationService: ConfirmationService,
    private router: Router,
    public mensageria: MensageriaService) { }

  ngOnInit() {

  }

  onSubmit() {

  //  console.log(this.rodadaCartola);
    this.cadastrarRodadaCartola.cadastrarRodadaCartola (this.rodadaCartola).subscribe(
      () => {
        this.mensageria.setMensagemSucesso();
        this.router.navigate(['/rodadaCartola']);
      },
      (erro) => {
        if (erro.status && erro.status === 409) {
          this.mensageria.setMensagemAlerta(false, true, 'Rodada já cadastrada!');
        } else {
          this.mensageria.setMensagemAlerta(false, true, 'Não foi possível realizar o cadastro da Rodada!');
        }
      }
    );

  }

}
