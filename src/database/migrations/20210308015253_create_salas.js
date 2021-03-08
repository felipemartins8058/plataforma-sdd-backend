
exports.up = function(knex) { //criação da tabela
    return knex.schema.createTable('salas', function(table){
        table.increments();
        table.string('senha').notNullable();
    })
};

exports.down = function(knex) { //caso ocorram erros
    return knex.schema.dropTable('salas');
};
