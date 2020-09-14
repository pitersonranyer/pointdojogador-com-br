export interface SaldoUsuario {
    idUsuario: number;
    idSaldoUsuario: number;
    idUsuarioLiberador: number;
    valorSolicitado: number;
    tsSolicitacao: string;
    tsLiberacao: string;
    indicadorLiberacao: boolean;
}