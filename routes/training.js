const express = require('express');
const router = express.Router();

router.get('/add-training', (req, res) => {
  res.render('index', { page: 'add-training', exerciseCount: 7 });
});

router.get('/calisthenics', (req, res) => {
  res.render('index', { page: 'calisthenics' });
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
  next();
});

module.exports = router;
