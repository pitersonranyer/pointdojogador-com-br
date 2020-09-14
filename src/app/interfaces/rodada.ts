export interface Rodada {
    partida_id: number;
    campeonato: { campeonato: Campeonato };
    placar: string;
    time_mandante: { time_mandante: TimeMandante };
    time_visitante: { time_visitante: TimeVisitante };
    placar_mandante: number;
    placar_visitante: number;
    status: string;
    slug: string;
    data_realizacao: string;
    hora_realizacao: string;
    data_realizacao_iso: string;
    estadio: { estadio: Estadio };
    _link: string;
}

export interface Campeonato {
    campeonato_id: number;
    nome: string;
    slug: string;
}

export interface TimeMandante {
    time_id: number;
    nome_popular: string;
}
export interface TimeVisitante {
    time_id: number;
    nome_popular: string;
}

export interface Estadio {
   estadio_id: number;
   nome_popular: string;
}