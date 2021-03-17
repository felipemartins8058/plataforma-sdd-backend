const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); //validações

const routes = express.Router();


const CargosController = require('./controllers/CargosController');

//listagem de cargos
routes.get('/cargos', CargosController.index);
//cadastro de cargos
routes.post('/cargos', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required()
    })
}), CargosController.create);
//deletar cargos
routes.delete('/cargos/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), CargosController.delete);
//editar cargos
routes.put('/cargos/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), CargosController.update);

module.exports = routes;