const express = require('express');
const router = express.Router();
const databaseService = require('../data/databaseService');

router.get('/calisthenics', (req, res) => {
  res.render('index', { page: 'calisthenics' });
});

router
  .route('/add-workout')
  .get((req, res) => {
    res.render('index', { page: 'forms/add-workout', exerciseCount: 6 });
  })
  .post((req, res) => {
    databaseService.addWorkout(req.body);
    res.send('successfully');
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
