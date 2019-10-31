exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('vinos', function(table) {
      table.increments('id').primary();
      table.string('vineyard');
      table.string('name');
      table.string('color');
      table.string('type');
      table.integer('year');
      table.integer('rating');
      
      table.timestamps(true, true);
    }),
  ])
};


exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('vinos'),
  ]);
};