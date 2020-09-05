import { Injectable } from '@angular/core';

@Injectable()
export class ConfiguracaoService {

  /**
   * @description A partir do código de acesso retorna a descrição do mesmo
   * @returns string
   */
  public traduzirAcessos(acesso: string): string {
    switch (acesso) {
      case 'ROLE_0000':
        return 'Administrador geral sistema';
    }
  }

}
