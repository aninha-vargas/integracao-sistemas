import {INTEGER, STRING, Sequelize}  from 'sequelize';
import Conn from '../ConnectionDB';

const Pessoa = Conn.define('pessoa', {
    idPessoa: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: STRING,
        autoIncrement: false,
        allowNull: true
    },
    idade: {
        type: INTEGER,
        autoIncrement: false,
        allowNull: true
    },
    cep: {
        type: STRING,
        autoIncrement: false,
        allowNull: true
    },
    logradouro: {
        type: STRING,
        autoIncrement: false,
        allowNull: true
    },
    complemento: {
        type: STRING,
        autoIncrement: false,
        allowNull: true
    },
    bairro: {
        type: STRING,
        autoIncrement: false,
        allowNull: true
    },
    localidade: {
        type: STRING,
        autoIncrement: false,
        allowNull: true
    },
    uf: {
        type: STRING,
        autoIncrement: false,
        allowNull: true
    },
    ibge: {
        type: STRING,
        autoIncrement: false,
        allowNull: true
    },
    gia: {
        type: STRING,
        autoIncrement: false,
        allowNull: true
    },
    ddd: {
        type: STRING,
        autoIncrement: false,
        allowNull: true
    },
    siafi: {
        type: STRING,
        autoIncrement: false,
        allowNull: true
    }
})

Pessoa.sync();

export default Pessoa;