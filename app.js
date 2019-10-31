const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(express.json());
app.use(express.static('public'));
app.locals.title = 'My Cellar';

app.get('/', (request, response) => {
});

app.get('/api/v1/vinos', (request, response) => {
  database('vinos').select()
    .then(wine => response.status(200).json(wine))
    .catch(error => response.status(500).json({error}))
});

app.post('/api/v1/vinos', (request, response) => {
  const wines = request.body;
  for(let requiredParameter of ['name', 'color', 'type', 'year', 'rating']) {
    if(!wines[requiredParameter]) {
      return response
        .status(422)
        .send({error: `Expected format: {name: <String>, color: <String>, type: <String>, year: <Integer>, rating: <Integer>}. You're missing the ${requiredParameter} property.`})
    }
  }
  database('wines').where('name', wines.name).select()
    .then(existingWines => {
      if(!existingWines.length) {
        database('wines').insert(wines, 'id')
          .then(wines => response.status(201).json({id: wines[0]}))
          .catch(error => response.status(500).json({error}))
      } else {
        response.status(409).json(`${wines.name} already exists.`)
      }
    })
});

module.exports = app;