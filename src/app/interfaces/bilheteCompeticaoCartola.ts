export interface BilheteCompeticaoCartola {
  idBilhete: number;
  codigoBilhete: string;
  nomeUsuario: string;
  nrContatoUsuario: string;
  statusAtualBilhete: string;
  nrSequencialRodadaCartola: number;
//TimeBilhete
  time_id: number;
  assinante: boolean;
  foto_perfil: string;
  nome: string;
  nome_cartola: string;
  slug: string;
  url_escudo_png: string;
  url_escudo_svg: string;
  facebook_id: number;
}