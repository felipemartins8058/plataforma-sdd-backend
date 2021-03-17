const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const cargos = await connection('cargos').select('*');

        return response.json(cargos);
    },

    async create(request, response) {
        const { nome } = request.body;
        
        try {
            const [id] = await connection('cargos').insert({
                nome
            });

            return response.json({ id });
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

    async delete(request, response) {
        const { id } = request.params;

        try {
            await connection('cargos')
                .where('id', id)
                .delete();

            return response.status(200).json({ message: 'Deleted succesfully' });
        } catch (error) {
            return response.status(500).json({ error: error });
        }
    },
};