
exports.up = function(knex) { //criação da tabela
    return knex.schema.createTable('salas', function(table){
        table.string('id').primary();
    })
};

exports.down = function(knex) { //caso ocorram erros
    return knex.schema.dropTable('salas');
};
