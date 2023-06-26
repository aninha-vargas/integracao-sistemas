import { PessoaRepository } from "../data/Pessoa.repository";
import { Request, Response } from 'express';
import { Pessoa } from "../models/Pessoa.model";
import Axios from 'axios';
import { Endereco } from "../models/Endereco.models";
import { RabbitMQService } from "../services/Rabbitmq.services";

const repositoryPessoa = new PessoaRepository();
const service = new RabbitMQService();

export class PessoaController {
    async listar(request: Request, response: Response) {
        const result = await repositoryPessoa.listar();

        return response.json({ status: 'ok', content: result })
    }

    async Buscar(request: Request, response: Response) {
        const result = await repositoryPessoa.buscarPorId(request.params.idPessoa)

        return response.json({ status: result.status, content: result.content })
    }

    async cadastrar(request: Request, response: Response) {
        let { cep, nome, idade } = request.body;
        let endereco: Endereco = (await Axios.get(`http://localhost:3000/getApi/${cep}`)).data.content;
        let pessoa: Pessoa = { nome, idade, endereco }
        const result = await repositoryPessoa.incluir(pessoa);

        service.enviar(JSON.stringify(pessoa));

        return response.json({ status: result.status, content: result.content })

    }

    async atualizar(request: Request, response: Response) {
        let { cep, nome, idade, idPessoa } = request.body;
        let endereco: Endereco = (await Axios.get(`http://localhost:3000/getApi/${cep}`)).data.content;
        let pessoa: Pessoa = { nome, idade, endereco }
        console.log(pessoa);
        const result = await repositoryPessoa.atualizar(pessoa, idPessoa);

        return response.json({ status: result.status, content: result.content })
    }

    async deletar(request: Request, response: Response) {
        const result = await repositoryPessoa.deletar(request.params.idPessoa);

        return response.json({ status: result.status, content: result.content })
    }
}
