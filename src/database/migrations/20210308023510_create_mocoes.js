
exports.up = function(knex) {
    return knex.schema.createTable('mocoes', function(table){
        table.increments();
        table.string('titulo').notNullable();
        table.string('tema').notNullable();
        table.string('torneio').notNullable();
        table.string('infoslide').notNullable();

        table.integer('participante_id').unsigned().notNullable();
        table.foreign('participante_id').references('id').inTable('participantes');

        table.integer('sala_id').unsigned().notNullable();
        table.foreign('sala_id').references('id').inTable('salas');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('mocoes');
};
