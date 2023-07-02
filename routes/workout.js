const express = require('express');
const router = express.Router();

router.get('/calisthenics', (req, res) => {
  res.render('index', { page: 'calisthenics' });
});

router
  .route('/add-workout')
  .get((req, res) => {
    res.render('index', { page: 'forms/add-workout', exerciseCount: 6 });
  })
  .post((req, res) => {
    res.send(req.body);
  })
  .delete((req, res) => {
    //TODO:
  });

router.param('id', (req, res, next, id) => {
  next();
});

router
  .route('/:id')
  .get((req, res) => {
    res.send(`Get workout plan with ID ${req.params.id}`);
  })
  .post((req, res) => {
    res.send(`Get workout plan with ID ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Get workout plan with ID ${req.params.id}`);
  });

router.param('id', (req, res, next, id) => {
  next();
});

module.exports = router;
