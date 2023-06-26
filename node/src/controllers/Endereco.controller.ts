import { Request, Response } from 'express';
import Axios from 'axios';


export class EnderecoController {
    async getApi(request: Request, response: Response) {
        let { cep } = request.params
        await Axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(res => {
            return response.json({
                content: res.data
            });
        });
    }
}