const express = require('express'); //importa as funcionalidades do express
const { errors } = require('celebrate'); //lida com as mensagens erros (Ex: codigo 500)
const cors = require('cors'); //segurança
const routes = require('./routes');

const app = express(); //cria a aplicação

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;