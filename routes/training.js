const express = require('express');
const router = express.Router();

router.get('/gym', (req, res) => {
  res.render('index', { text: 'Gym' });
});

router.get('/calisthenics', (req, res) => {
  res.render('index', { text: 'Calisthenics' });
});

router.get('/:id', (req, res) => {
  res.send(`Get training plan with ID ${req.params.id}`);
});

module.exports = router;