
exports.up = function(knex) {
    return knex.schema.createTable('participantes_salas', function(table){
        table.increments();

        table.string('nome').notNullable();

        table.string('sala_id').notNullable();
        table.foreign('sala_id').references('id').inTable('salas');

        table.integer('cargo_id').unsigned().notNullable();
        table.foreign('cargo_id').references('id').inTable('cargos');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('participantes_salas');
};
