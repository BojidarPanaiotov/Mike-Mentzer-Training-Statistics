const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/trainingRoutine');

const express = require('express');
const app = express();

app.use(express.static('public'));
app.use('/css',express.static('node_modules/bootstrap/dist/css'));
app.use('/js',express.static('node_modules/bootstrap/dist/js'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { text: 'Hello World' });
});

const training = require('./routes/training');

app.use('/training', training);

app.listen(3000);
