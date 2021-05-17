const generateUniqueSala = require('../utils/generateUniqueSala');
const connection = require('../database/connection');

function generateSala() {
    return checkSala(generateUniqueSala());
}

async function checkSala(id) { //verifica se a sala criada randomicamente já existe
    // retorna verdadeiro se a senha já existir
    const checkSalaSenha = await connection('salas')
        .select('*')
        .where('id', id)
        .first();
    
    while (checkSalaSenha) { //enquanto a senha criada existir ele vai criando um novo
        id = generateSala();
    }

    return id;
}

module.exports = {
    async index (request, response) {
        const salas = await connection('salas').select('*');
        
        return response.json(salas);
    },

    async create(request, response) {
        const id = await generateSala();

        try {
            await connection('salas').insert({ //como é assincrono, ele espera essa função terminar para seguir com o resto do código
                id
            });

            return response.json({ id });
        } catch (error) {
            return response.status(500).json({ error: error });
        }
    },

    async search(request, response) {
        const { id } = request.params;

        try {	
            const sala = await connection('salas')
            .select(['salas.*'])
            .where('salas.id', id);
    
            response.status(200).json({sala});
        } catch (error) {
            response.status(500).json({ error: error });
            console.log(error);
        }
    }
};