
exports.up = function(knex) {
  return knex.schema.createTable('todo',(table)=>{
      table.increment();
      table.string('title').notNullable();
      table.string('desc');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('todo');
};
