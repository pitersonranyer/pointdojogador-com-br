export interface PalpiteUsuarioJogos {
    idUsuario: number;
    idCartela: number;
    idJogos: number;
    numeroPalpite: number;
    palpiteTimeMandante: boolean;
    palpiteTimeVisitante: boolean;
    palpiteEmpate: boolean;
    ResultadoPalpite: boolean;
    idTimeMandante: number;
    nomeMandante: string;
    nomeAbvdMandante: string;
    UrlEscudoMandante: string;
    placarTimeMandante: number;
    idTimeVisitante: number;
    nomeVisitante: string;
    nomeAbvdVisitante: string;
    UrlEscudoVisitante: string;
    placarTimeVisitante: number;
    dataJogo: string;
    horaJogo: string;
    nomeEstadio: string;
    situacaoJogo: string;
}