import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/primeng';


/**
 * @author Felipe Lima
 * @description Serviço criado para padronização na apresentação de mensagens
 */
@Injectable()
export class MensageriaService {

  constructor(private messageService: MessageService) {

  }

  public mensagensFixas: Message[] = [];
  public processamento = false;
  public novidade = true;
  public quantidadeRecadosNovos = 0;

  /**
   * @description Apresenta mensagem na tela de acordo com os parametros passados
   * @param fixa Se 'true', a mensagem será apresentada de forma fixa
   * @param flutuante Se 'true', a mensagem será apresentada de forma flutuante
   * @param mensagem Mensagem a ser apresentada na tela
   * @returns void
   */
  private apresentaMensagens(fixa: boolean, flutuante: boolean, mensagem: Message[]): void {
    this.processamento = false;
    this.limparMensagens();
    if (fixa) {
      this.mensagensFixas = mensagem;
    }
    if (flutuante) {
      this.messageService.addAll(mensagem);
    }
  }

  /**
   * @description Limpa o conteúdo das variáveis 'mensagensFixas' e 'mensagensFlutuantes'
   * @returns void
   */
  public limparMensagens(): void {
    this.mensagensFixas = [];
    this.messageService.clear();
  }

  /**
   * @description Adiciona mensagem ao array 'mensagensFixas'
   * @param tipoErro success, warn, error
   * @param titulo titulo da mensagem a ser adicionada
   * @param mensagem mensagem a ser adicionada
   * @returns void
   */
  public putMensagemFixa(tipoErro: string, titulo: string, mensagem: string) {
    this.processamento = false;
    this.mensagensFixas.push({
      severity: tipoErro,
      summary: titulo,
      detail: mensagem
    });
  }

  /**
   * @description Apresenta mensagem de sucesso padrão
   * @returns void
   */
  public setMensagemSucesso(): void {
    const mensagem = [{
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Operação realizada com sucesso'

    }];
    this.apresentaMensagens(false, true, mensagem);
  }

  /**
   * @description Retorna mensagem de erro padrão
   * @param fixa Se 'true', a mensagem será apresentada de forma fixa
   * @param flutuante Se 'true', a mensagem será apresentada de forma flutuante
   * @param titulo título da mensagem a ser apresentada
   * @param texto texto da mensagem a ser apresentada
   */
  public setMensagemErro(fixa: boolean, flutuante: boolean, titulo: string, texto: string): void {
    const mensagem = [{
      severity: 'error',
      summary: titulo,
      detail: texto
    }];
    this.apresentaMensagens(fixa, flutuante, mensagem);
  }

  /**
   * @description Retorna mensagem de erro de conexão com o backend
   * @returns void
   */
  public setMensagemErroConexao(): void {
    const mensagem = [{
      severity: 'error',
      summary: 'ERRO DE CONEXÃO:',
      detail: 'Servidor indisponível, contate o suporte técnico.'
    }];
    this.apresentaMensagens(true, true, mensagem);
  }

  /**
   * @description Apresenta mensagem de erro padrão ao pesquisar
   * @param texto texto da mensagem a ser apresentada
   * @returns void
   */
  public setMensagemErroPesquisar(texto: string): void {
    const mensagem = [{
      severity: 'error',
      summary: 'ERRO ao pesquisar:',
      detail: texto
    }];
    this.apresentaMensagens(true, true, mensagem);
  }

  /**
   * @description Retorna mensagem de erro padrão ao salvar
   * @param texto texto da mensagem a ser apresentada
   * @returns void
   */
  public setMensagemErroSalvar(texto: string): void {
    const mensagem = [{
      severity: 'error',
      summary: 'ERRO AO SALVAR:',
      detail: texto
    }];
    this.apresentaMensagens(true, true, mensagem);
  }

  /**
   * @description Retorna mensagem de erro padrão ao atualizar
   * @param texto texto da mensagem a ser apresentada
   * @returns void
   */
  public setMensagemErroAtualizar(texto: string): void {
    const mensagem = [{
      severity: 'error',
      summary: 'ERRO NA ATUALIZAÇÃO:',
      detail: texto
    }];
    this.apresentaMensagens(true, true, mensagem);
  }

  /**
   * @description Apresenta mensagem de erro padrão ao excluir
   * @param texto texto da mensagem a ser apresentada
   * @returns void
   */
  public setMensagemErroExcluir(texto: string): void {
    const mensagem = [{
      severity: 'error',
      summary: 'ERRO NA EXCLUSÃO:',
      detail: texto
    }];
    this.apresentaMensagens(true, true, mensagem);
  }

  /**
   * @description Apresenta mensagem de alerta padrão
   * @param fixa Se 'true', a mensagem será apresentada de forma fixa
   * @param flutuante Se 'true', a mensagem será apresentada de forma flutuante
   * @param texto texto da mensagem a ser apresentada
   * @returns void
   */
  public setMensagemAlerta(fixa: boolean, flutuante: boolean, texto: string): void {
    const mensagem = [{
      severity: 'warn',
      summary: 'ATENÇÃO:',
      detail: texto
    }];
    this.apresentaMensagens(fixa, flutuante, mensagem);
  }

  /**
   * @description Retorna mensagem de informação que a operação foi cancelada
   * @returns void
   */
  public setMensagemOperacaoCancelada(): void {
    const mensagem = [{
      severity: 'info',
      summary: 'INFORMAÇÃO: ',
      detail: 'Operação cancelada.'
    }];
    this.apresentaMensagens(false, true, mensagem);
  }

  /**
   * @description Apresenta mensagem de campos obrigatórios padrão. Função utilizada na validação de formulários
   * @returns void
   */
  public setMensagemCamposObrigatorios(): void {
    const mensagem = [{
      severity: 'warn',
      summary: 'ATENÇÃO: ',
      detail: 'Existe(m) campo(s) obrigatório(s) não preenchido(s) corretamente.'
    }];
    this.apresentaMensagens(false, true, mensagem);
  }

  /**
   * @description Retorna mensagem de privacidade das informações
   */
  public getMensagemProibicaoFornecerInformacao(): string {
    return 'ATENÇÃO: É expressamente PROIBIDO fornecer informações contidas no sistema a terceiros.';
  }

}

