const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); //validações

const routes = express.Router();


const CargosController = require('./controllers/CargosController');
const ParticipantesController = require('./controllers/ParticipantesController');
const SalaController = require('./controllers/SalaController');

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

//listagem de participantes
routes.get('/participantes', ParticipantesController.index);
//cadastro de participantes
routes.post('/participantes', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        cargo_id: Joi.number().required()
    })
}), ParticipantesController.create);
//editar participantes
routes.put('/participantes/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), ParticipantesController.update);
//deletar participantes
routes.delete('/participantes/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), ParticipantesController.delete);

//listagem de salas
routes.get('/salas', SalaController.index);
//cadastro de ongs
routes.post('/salas', SalaController.create);

module.exports = routes;