<?php

namespace App\Services;

use App\Repositories\PessoaRepository;
use Illuminate\Support\Facades\Http;
use App\Services\RabbitMQServiceService;



class PessoaService
{
    private $pessoaRepository;
    private $rabbitMQService;

    public function __construct(RabbitMQService $rabbitMQService, PessoaRepository $pessoaRepository)
    {
        $this->rabbitMQService = $rabbitMQService;
        $this->pessoaRepository = $pessoaRepository;
    }


    public function listarPessoas()
    {
        return $this->pessoaRepository->listar();
    }

    public function obterPessoa($id)
    {
        return $this->pessoaRepository->obter($id);
    }

    public function cadastrar($dados)
    {
        return $this->pessoaRepository->cadastrar($dados);
    }

    function receberPessoas()
    {
        $fila = "node";
        $pessoas = $this->rabbitMQService->consume($fila);
        $objeto = [];
        foreach ($pessoas as $pessoa) {
            $array = json_decode($pessoa, true);
            foreach ($array as $key => $value) {
                if (is_array($value)) {
                    foreach ($value as $subKey => $subValue) {
                        $objeto[$subKey] =  $subValue;
                    }
                } else {
                    $objeto[$key] = $value;
                }
            }
        }
        return $this->cadastrar($objeto);
    }
}
