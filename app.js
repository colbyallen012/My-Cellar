const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';

app.use(express.json());
app.use(express.static('public'));
app.locals.title = 'My Cellar';

app.get('/', (request, response) => {
});

module.exports = app;