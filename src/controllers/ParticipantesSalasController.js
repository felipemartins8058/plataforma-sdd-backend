const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const participantes_salas = await connection('participantes_salas')
            .leftJoin('cargos','participantes_salas.cargo_id', 'cargos.id')
            .select(['participantes_salas.*', 'cargos.grupo', 'cargos.id']);
        
        return response.json(participantes_salas);
    },

    async joinSala(request, response) {
        const { sala_id } = request.params;
        const { nome, cargo_id } = request.body;

        const cargo_existente = await connection('participantes_salas')
            .select('participantes_salas.cargo_id')
            .where('participantes_salas.cargo_id', cargo_id)
            .andWhere('participantes_salas.sala_id', sala_id)
            .first();

        try {	
            if(!cargo_existente) { //se o cargo selecionado não tiver sido cadastrado ainda naquela sala ele cadastra
                const participante_sala = await connection('participantes_salas').insert({
                    nome,
                    cargo_id,
                    sala_id,
                });
    
                response.status(200).json(participante_sala);
            }

            // se já existe ele dá erro
            response.status(500).json({ message: "Cargo já existente na sala" });
        } catch (error) {
            response.status(500).json({ error: error });
        }
    }
};