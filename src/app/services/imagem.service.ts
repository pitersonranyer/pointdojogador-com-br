import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable()
export class ImagemService {

  public detalhamentoImagemVisivel = false;
  public imagemDetalhar = '';
  public nomeImagemDetalhar: string;

  public detalhamentoImagemSubject: Subject<boolean> = new Subject();
  public inscdetalhamentoImagem: Subscription;

  /**
   * @description Retorna imagem de usuário padrão (Utilizada quando não possui foto cadastrada)
   * @returns string Caminho da imagem
   */
  public getImagemPadraoUsuario(): string {
    return '../../assets/layout/images/no-user.png';
  }

  public getImagemPadraoGeral(): string {
    return '../../assets/layout/images/no-image.jpeg';
  }

  /**
   * @description Preparação da imagem para cadastrar no banco de dados
   * @returns imagem tratada na base64
   */
  preparaImagemGravar(imagem: any): any {
    return imagem !== this.getImagemPadraoGeral()
      && imagem != null
      && imagem !== undefined
      && imagem !== '' ? imagem.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, '') :
      null;
  }

  /**
   * @description Preparação da imagem cadastrada no banco de dados para exibir em tela
   * @returns imagem tratada na base64 ou imagem padrão "sem foto"
   */
  preparaImagemExibir(imagem): string {
    return imagem != null && imagem !== undefined && imagem !== '' ? 'data:image/png;base64,' + imagem : this.getImagemPadraoGeral();
  }
}
