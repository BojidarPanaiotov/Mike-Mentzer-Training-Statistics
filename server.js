const express = require('express');
const app = express();
const databaseService = require('./data/databaseService');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static('node_modules/bootstrap/dist/css'));
app.use('/js', express.static('node_modules/bootstrap/dist/js'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const data = databaseService.getAll();
  res.render('index', { page: 'homepage', workouts: data });
});

const workout = require('./routes/workout');
app.use('/workout', workout);

app.listen(3000);
