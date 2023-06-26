import { Router } from 'express';
import { PessoaController } from '../controllers/Pessoa.controller';
import { EnderecoController } from '../controllers/Endereco.controller';

const router: Router = Router();

/**
 * @swagger
 * /get:
 *   get:
 *     description: Buscar todas as pessoas
 *     responses:
 *       200:
 *         description: Retorna todas as pessoa no banco de dados
 */
router.get('/get', new PessoaController().listar);

/**
 * @swagger
 * /BuscarPorId/{:idPessoa}:
 *   get:
 *     description: Buscar pessoas por ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - id: path
 *         name: idPessoa
 *         required: true
 *         schema:
 *          $ref: '#/components/schemas/Pessoa' 
 *     responses:
 *       200:
 *         description: Retorna uma pessoa
 *       404:
 *         description: Pessoa não encontrada
 */
router.get('/BuscarPorId/:idPessoa', new PessoaController().Buscar);

/**
 * @swagger
 * /newPessoa:
 *   post:
 *     description: Cadastrar uma pessoa
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Pessoa cadastrada com sucesso
 */
router.post('/newPessoa', new PessoaController().cadastrar);

/**
 * @swagger
 * /atualizarPessoa:
 *   put:
 *     description: Atualiza o cadastro de uma pessoa
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Pessoa Atualizada com sucesso
 */
router.put('/atualizarPessoa', new PessoaController().atualizar);

/**
 * @swagger
 * /deletarPessoa/{:idPessoa}:
 *   delete:
 *     description: Deleta a pessoa com o respectivo id
 *     produces:
 *       - application/json
 *     parameters:
 *       - id: path
 *         name: IdPessoa
 *         required: true
 *     responses:
 *       200:
 *         description: Pessoa deletada com sucesso
 */
router.delete('/deletarPessoa/:idPessoa', new PessoaController().deletar);

/**
 * @swagger
 * /getApi/{:cep}:
 *   get:
 *     description: Busca o cep informado
 *     produces:
 *       - application/json
 *     parameters:
 *       - id: path
 *         name: cep
 *         required: true
 *     responses:
 *       200:
 *         description: Retorna um json com as informações do cep informado
 *       404:
 *         description: Cep não encontrado
 */
router.get('/getApi/:cep', new EnderecoController().getApi)

export { router }