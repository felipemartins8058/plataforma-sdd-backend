
exports.up = function(knex) { //criação da tabela
    return knex.schema.createTable('cargos', function(table){
        table.increments();
        table.string('nome').notNullable();
        table.string('grupo').notNullable();
    })
};

exports.down = function(knex) { //caso ocorram erros
    return knex.schema.dropTable('cargos');
};