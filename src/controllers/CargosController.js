const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const cargos = await connection('cargos').select('*');

        return response.json(cargos);
    },

    async create(request, response) {
        const { nome, grupo } = request.body;
        
        try {
            const [id] = await connection('cargos').insert({
                nome,
                grupo
            });

            return response.status(201).json({ id });
        } catch (error) {
            response.status(500).json({ error: error });
        }
    },

    async update(request, response) {
        const { id } = request.params;
        const { nome } = request.body;
        
        try {
            await connection('cargos')
                .where('id', id)
                .update({
                    nome
                });

            return response.status(200).json({ message: 'Updated succesfully.' });
        } catch (error) {
            return response.status(500).json({ error: error });
        }
    },

    async availableCargos(request, response) {
        const { sala_id } = request.params;
        
        try {
            const cargos_disponiveis = await connection('cargos')
            .select(['cargos.*'])
            .leftJoin('participantes_salas', function () {
                this.on('cargos.id', '=', 'participantes_salas.cargo_id')
                this.andOnVal('participantes_salas.sala_id', '=' , sala_id)
            })
            .where('participantes_salas.cargo_id', null);

            return response.json(cargos_disponiveis);
        } catch (error) {
            response.status(500).json({ error: error });
        }
    }
};