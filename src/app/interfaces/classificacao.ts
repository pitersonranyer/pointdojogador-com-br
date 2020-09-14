export interface Classificacao {
    posicao: number;
    pontos: number;
    time: Array<Time>;
    jogos: number;
    vitorias: number;
    empates: number;
    derrotas: number;
    gols_pro: number;
    gols_contra: number;
    saldo_gols: number;
    aproveitamento: number;
}

export interface Time {
    time_id: number;
    nome_popular: string;
}