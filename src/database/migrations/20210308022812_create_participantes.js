
exports.up = function(knex) {
    return knex.schema.createTable('participantes', function(table){
        table.increments();
        table.string('nome').notNullable();

        table.integer('cargo_id').unsigned().notNullable();
        table.foreign('cargo_id').references('id').inTable('cargos');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('participantes');
};
