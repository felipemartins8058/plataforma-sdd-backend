const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development; //estiver no ambiente de testes, utiliza o banco de testes, se não, utiliza o banco de desenvolvimento

const connection = knex(config);

module.exports = connection;