export interface CompeticaoCartola {
    nrSequencialRodadaCartola: number;
    idUsuarioAdmLiga: number;
    nomeLiga: string;
    anoTemporada: number;
    nrRodada: number;
    dataFimInscricao: string;
    horaFimInscricao: string;
    valorCompeticao: number;
    statusCompeticao: string;  // Aberta, Fechada, Encerrada
    tipoCompeticao: string; //Mensal, Tiro Curto...
}