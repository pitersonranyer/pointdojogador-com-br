export interface SaldoPendenciaUsuario {
    idUsuario: number;
    idSaldoUsuario: number;
    idUsuarioLiberador: number;
    valorSolicitado: number;
    tsSolicitacao: Date;
    tsLiberacao: string;
    indicadorLiberacao: boolean;
    nome: string;
    email: string;
    contato: string;
    timeFavorito: string;
    saldo: string;
}