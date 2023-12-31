<?php

namespace App\Services;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Connection\AMQPSSLConnection;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQService
{
    public function publish($message)
    {
        $connection = new AMQPStreamConnection(env('MQ_HOST'), env('MQ_PORT'), env('MQ_USER'), env('MQ_PASS'), env('MQ_VHOST'));
        $channel = $connection->channel();
        $channel->exchange_declare('test_exchange', 'direct', false, false, false);
        $channel->queue_declare('laravel', false, false, false, false);
        $channel->queue_bind('laravel', 'test_exchange', 'test_key');
        $msg = new AMQPMessage($message);
        $channel->basic_publish($msg, 'test_exchange', 'test_key');
        echo " [x] Sent $message to test_exchange / laravel.\n";
        $channel->close();
        $connection->close();
    }
    public function consume($fila)
    {
        $connection = new AMQPStreamConnection(env('MQ_HOST'), env('MQ_PORT'), env('MQ_USER'), env('MQ_PASS'), env('MQ_VHOST'));
        $channel = $connection->channel();
        $messages = [];

        $callback = function ($msg) use (&$messages) {
            $messages[] = $msg->body;
        };

        $channel->queue_declare($fila, false, false, false, false);
        $channel->basic_consume($fila, '', false, true, false, false, $callback);

        while (count($messages) == 0) {
            $channel->wait();
        }

        $channel->close();
        $connection->close();

        return $messages;
    }
}
