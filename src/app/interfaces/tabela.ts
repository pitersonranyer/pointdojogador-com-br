export interface Tabela {
    fase_id: number;
    edicao: { edicao: Edicao };
    nome: string;
    slug: string;
    status: string;
    decisivo: boolean;
    eliminatorio: boolean;
    ida_e_volta: boolean;
    tipo: string;
    grupos: [];
    chaves: [];
    proxima_fase: string;
    fase_anterior: string;
    partidas: { partidas: Partidas };
    tabela: [];
}


export interface Edicao {
    edicao_id: number;
    temporada: string;
    nome: string;
    nome_popular: string;
    slug: string;
}

export interface Partidas {
    rodada_1: [];
}