const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const participantes = await connection('participantes').select('*');

        return response.json(participantes);
    },

    async create(request, response) {
        const { nome, cargo_id } = request.body;
        
        try {
            const [id] = await connection('participantes').insert({
                nome,
                cargo_id
            });

            return response.status(201).json({ id });
        } catch (error) {
            response.status(500).json({ error: error });
        }
    },

    async update(request, response) {
        const { id } = request.params;
        const { nome, cargo_id } = request.body;
        
        try {
            await connection('participantes')
                .where('id', id)
                .update({
                nome,
                cargo_id
                });

            return response.status(200).json({ message: 'Updated succesfully.' });
        } catch (error) {
            return response.status(500).json({ error: error });
        }
    },

    async delete(request, response) {
        const { id } = request.params;

        try {
            await connection('participantes')
                .where('id', id)
                .delete();

            return response.status(200).json({ message: 'Deleted succesfully' });
        } catch (error) {
            return response.status(500).json({ error: error });
        }
    },
};