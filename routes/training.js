const express = require('express');
const router = express.Router();

router.get('/gym', (req, res) => {
  res.render('index', { text: 'Gym' });
});

router.get('/calisthenics', (req, res) => {
  res.render('index', { text: 'Calisthenics' });
});

router
  .route('/:id')
  .get((req, res) => {
    res.send(`Get training plan with ID ${req.params.id}`);
  })
  .post((req, res) => {
    res.send(`Get training plan with ID ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Get training plan with ID ${req.params.id}`);
  });

router.param('id', (req, res, next, id) => {
    console.log(id)
  next();
});

module.exports = router;
