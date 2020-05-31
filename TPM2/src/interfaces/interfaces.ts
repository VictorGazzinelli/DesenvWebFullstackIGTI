export interface Cidade {
    ID: string,
    Nome: string,
    Estado: string
}

export interface Estado {
    ID: string,
    Sigla: string,
    Nome: string
}

export interface NumeroCidadeUF {
    Sigla: string,
    NumeroCidades: number
}