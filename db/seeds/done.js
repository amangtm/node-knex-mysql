
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('done').del()
    .then(function () {
      // Inserts seed entries
      return knex('done').insert([
        {id: 1, title: 'task1', desc: 'completed task1'},
        {id: 2, title: 'task2', desc: 'completed task2'},
      ]);
    });
};
