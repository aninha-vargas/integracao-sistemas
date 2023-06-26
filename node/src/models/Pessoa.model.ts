import { Endereco } from "./Endereco.models"

export interface Pessoa {
    idPessoa?: number,
    nome?: string,
    idade?: string,
    endereco?: Endereco
}