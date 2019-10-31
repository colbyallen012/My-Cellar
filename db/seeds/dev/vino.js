exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('wines').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('wines').insert({id: 1, name: 'my vineyard', color: 'red', type: 'merlot', year: 2015, rating: 5}),
        knex('wines').insert({id: 2, name: 'his vineyard', color: 'white', type: 'sauvignon blanc', year: 2016, rating: 4}),
        knex('wines').insert({id: 3, name: 'her vineyard', color: 'red', type: 'pinot noir', year: 2017, rating: 3}),
        knex('wines').insert({id: 4, name: 'their vineyard', color: 'white', type: 'pinot', year: 2018, rating: 2})
        .then(() => console.log('Seeding complete'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};

