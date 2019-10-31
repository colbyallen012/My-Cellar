exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('vinos').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('vinos').insert({id: 1, name: 'my vineyard', vineyard: 'mine', color: 'red', type: 'merlot', year: 2015, rating: 5}),
        knex('vinos').insert({id: 2, name: 'his vineyard', vineyard: 'mine', color: 'white', type: 'sauvignon', year: 2016, rating: 4}),
        knex('vinos').insert({id: 3, name: 'her vineyard', vineyard: 'mine', color: 'red', type: 'pinot noir', year: 2017, rating: 3}),
        knex('vinos').insert({id: 4, name: 'their vineyard', vineyard: 'mine', color: 'white', type: 'pinot', year: 2018, rating: 2})
        .then(() => console.log('Seeding complete'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};