import { Injectable } from '@angular/core';

import { TOKEN_STORAGE } from '../../environments/environment';

import { TOKEN_GLOBO } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TokenService {

  get token() {
    return localStorage.getItem(TOKEN_STORAGE);
  }

  set token(token: string) {
    localStorage.setItem(TOKEN_STORAGE, token);
  }

  resetarToken() {
    localStorage.removeItem(TOKEN_STORAGE);
  }



  get tokenGlobo() {
    return localStorage.getItem(TOKEN_GLOBO);
  }

  set tokenGlobo(tokenGlobo: string) {
    localStorage.setItem(TOKEN_GLOBO, tokenGlobo);
  }

  resetarTokenGlobo() {
    localStorage.removeItem(TOKEN_GLOBO);
  }
}
