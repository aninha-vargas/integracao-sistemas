import { Pessoa } from './../models/Pessoa.model';
import PessoaModelTable from '../models/tables/Pessoa.models.tables';

let pessoas: Pessoa[] = [];

export class PessoaRepository {
    async listar(): Promise<Pessoa[]> {
        let result = await PessoaModelTable.findAll()
        pessoas = []
        for (let d in result) {
            pessoas.push(result[d].dataValues)
        }
        return pessoas
    }

    async incluir(pessoa: Pessoa) {
        const insert = await PessoaModelTable.create({
            nome: pessoa.nome,
            idade: pessoa.idade,
            cep: pessoa.endereco.cep,
            logradouro: pessoa.endereco.logradouro,
            complemento: pessoa.endereco.complemento,
            //bairro: pessoa.endereco.bairro,
            localidade: pessoa.endereco.localidade,
            uf: pessoa.endereco.uf,
            ibge: pessoa.endereco.ibge,
            gia: pessoa.endereco.gia,
            ddd: pessoa.endereco.ddd,
            siafi: pessoa.endereco.siafi,
        });

        if (insert) {
            return {
                status: 'ok',
                content: 'Pessoa cadastrada com sucesso!'
            }
        } else {
            return {
                status: 'error',
                content: 'Erro ao castrasdar essa pessoa!'
            }
        }
    }

    async buscarPorId(idPessoa: number) {
        let result = await PessoaModelTable.findOne({
            where: {
                idPessoa: idPessoa
            }
        });
        if (result) {
            return {
                status: 'ok',
                content: result.dataValues
            }
        } else {
            return {
                status: 'error',
                content: 'Pessoa não encontrada'
            }
        }
    }

    async atualizar(pessoa: Pessoa, idPessoa: number) {

       let update = await PessoaModelTable.update({
            nome: pessoa.nome,
            idade: pessoa.idade,
            cep: pessoa.endereco.cep,
            logradouro: pessoa.endereco.logradouro,
            complemento: pessoa.endereco.complemento,
            bairro: pessoa.endereco.bairro,
            localidade: pessoa.endereco.localidade,
            uf: pessoa.endereco.uf,
            ibge: pessoa.endereco.ibge,
            gia: pessoa.endereco.gia,
            ddd: pessoa.endereco.ddd,
            siafi: pessoa.endereco.siafi,
        }, {
            where: {
                idPessoa: idPessoa
            }
        })

        if (update) {
            return {
                status: 'ok',
                content: 'Pessoa atualizada com sucesso!'
            }
        } else {
            return {
                status: 'error',
                content: 'Erro ao atualizar essa pessoa!'
            }
        }
    }

    async deletar(idPessoa: string) {

        let result = await PessoaModelTable.destroy({
            where: {
                idPessoa: idPessoa
            }
        });
        if (result > 0) {
            return {
                status: 'ok',
                content: 'Pessoa deletada com sucesso!'
            }
        } else {
            return {
                status: 'error',
                content: 'Algo deu errado ao deletar essa pessoa!'
            }
        }


    }

}