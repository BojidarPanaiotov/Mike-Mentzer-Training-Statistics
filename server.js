const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { text: 'Hello World' });
});

const training = require('./routes/training');

app.use('/training', training);

app.listen(3000);
