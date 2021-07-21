
exports.up = function(knex) {
    return knex.schema.createTable('done',(table)=>{
        table.increments();
        table.string('title').notNullable();
        table.string('desc');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable();
};
