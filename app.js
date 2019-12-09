const express = require('express');
const app = express();
const cors = require('cors');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const querystring = require('querystring');

app.use(cors());
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
  for(let requiredParameter of ['vineyard', 'name', 'color', 'type', 'year', 'rating']) {
    if(!wines[requiredParameter]) {
      return response
        .status(422)
        .send({error: `Expected format: { vineyard: <String>, name: <String>, color: <String>, type: <String>, year: <Integer>, rating: <Integer>}. You're missing the ${requiredParameter} property.`})
    }
  }
  database('vinos').insert(wines, 'id')
    .then(wines => {
      response.status(201).json({ id: wines[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/vinos/:id', (request, response) => {
  const {id} = request.params;
  database('vinos').where('id', id).select()
    .then(wines => {
      if(wines.length) {
            database('vinos').where('id', id).del()
              .then(() => response.status(204).json('Wine deleted'))
              .catch(error => response.status(500).json({error}))
      } else {
        response.status(404).json('Wine does not exist')
      }
    })
})

module.exports = app;