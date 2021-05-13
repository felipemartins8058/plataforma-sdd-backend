const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const participantes_salas = await connection('participantes_salas').select('*');
        
        return response.json(participantes_salas);
    },

    async joinSala(request, response) {
        const { sala_id } = request.params;
        const { nome, cargo_id } = request.body;

        try {	
            const participante_sala = await connection('participantes_salas').insert({
                nome,
                cargo_id,
                sala_id,
            });
            
            response.status(200).json(participante_sala);
        } catch (error) {
            response.status(500).json({ error: error });
        }
    }
};