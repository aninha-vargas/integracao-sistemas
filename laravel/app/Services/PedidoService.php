<?php

namespace App\Services;

use App\Repositories\PedidoRepository;
use App\Services\PessoaService;

class PedidoService
{
    private $pedidoRepository;
    private $pessoaService;

    public function __construct(PedidoRepository $pedidoRepository, PessoaService $pessoaService)
    {
        $this->pedidoRepository = $pedidoRepository;
        $this->pessoaService = $pessoaService;
    }

    public function listarPedidos()
    {
        return $this->pedidoRepository->listar();
    }

    public function cadastrarPedido($dados)
    {
        $solicitante = $this->pessoaService->obterPessoa($dados['solicitante_id']);
        $dados['solicitante_id'] = $solicitante;
        unset($dados['solicitante_id']);

        $responsavel = $this->pessoaService->obterPessoa($dados['responsavel_id']);
        $dados['responsavel_id'] = $responsavel;
        unset($dados['responsavel_id']);

        return $this->pedidoRepository->criar($dados);
    }

    public function atualizarPedido($id, $dados)
    {
        return $this->pedidoRepository->atualizar($id, $dados);
    }
}
