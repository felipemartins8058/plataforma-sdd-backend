const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); //validações

const routes = express.Router();


const CargosController = require('./controllers/CargosController');
const ParticipantesController = require('./controllers/ParticipantesController');
const SalaController = require('./controllers/SalaController');
const ParticipantesSalasController = require('./controllers/ParticipantesSalasController');

//listagem de cargos
routes.get('/cargos', CargosController.index);
//cadastro de cargos
routes.post('/cargos', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        grupo: Joi.string().required()
    })
}), CargosController.create);
//editar cargos
routes.put('/cargos/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), CargosController.update);
//listagem dos cargos disponíveis
routes.get('/cargos/:sala_id', CargosController.availableCargos);

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
//cadastro de sala
routes.post('/salas', SalaController.create);
//buscar sala
routes.get('/salas/:id', SalaController.search);

//entrar em sala
routes.post('/participantessalas/:sala_id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        sala_id: Joi.string().required()
    }),
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        cargo_id: Joi.number().required()
    })
}), ParticipantesSalasController.joinSala);

// listagem de participantes e suas salas
routes.get('/participantessalas', ParticipantesSalasController.index);

module.exports = routes;