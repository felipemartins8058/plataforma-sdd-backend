const generateUniqueSala = require('../utils/generateUniqueSala');
const connection = require('../database/connection');

function generateSala() {
    return checkSala(generateUniqueSala());
}

async function checkSala(senha) { //verifica se a sala criada randomicamente já existe
    // retorna verdadeiro se a senha já existir
    const checkSalaSenha = await connection('salas')
        .select('*')
        .where('senha', senha)
        .first();
    
    while (checkSalaSenha) { //enquanto a senha criada existir ele vai criando um novo
        senha = generateSala();
    }

    return senha;
}

module.exports = {
    async index (request, response) {
        const salas = await connection('salas').select('*');
        
        return response.json(salas);
    },

    async create(request, response) {
        const senha = await generateSala();

        try {
            await connection('salas').insert({ //como é assincrono, ele espera essa função terminar para seguir com o resto do código
                senha
            });

            return response.json({ senha });
        } catch (error) {
            return response.status(500).json({ error: error });
        }
    },
};