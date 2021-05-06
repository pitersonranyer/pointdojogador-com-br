export interface TimeBilheteCompeticaoCartola {
  idBilhete: number;
  time_id: number;
  assinante: boolean;
  foto_perfil: string;
  nome: string;
  nome_cartola: string;
  slug: string;
  url_escudo_png: string;
  url_escudo_svg: string;
  facebook_id: number;
  pontuacaoParcial: number;
  pontuacaoTotalCompeticao: number;
  qtJogadoresPontuados: number;
  colocacao: number;


  nrContatoUsuario: string;
  nomeUsuario: string;
  nrSequencialRodadaCartola: number;
}