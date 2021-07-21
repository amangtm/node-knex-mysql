
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      // Inserts seed entries
      return knex('todo').insert([
        {id: 1, title: 'task1', desc: 'Ongoing task1'},
        {id: 2, title: 'task2', desc: 'Ongoing task2'},
        {id: 3, title: 'task3', desc: 'Ongoing task3'},
      ]);
    });
};
