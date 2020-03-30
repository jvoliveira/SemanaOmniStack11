
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function(table){
      table.increments('id');
      table.string('nome').notNullable();
      table.string('telefone').notNullable();
      table.string('email').notNullable();
      table.string('senha').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  