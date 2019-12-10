// const app = require('./app')
import app from './app'

app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
  console.log(`Running on port ${app.get('port')}`)
});

// module.exports = app;
