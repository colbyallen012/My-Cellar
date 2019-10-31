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

app.get('/api/v1/wines', (request, response) => {
  database('wines').select()
    .then(wine => response.status(200).json(wine))
    .catch(error => response.status(500).json({error}))
});

module.exports = app;