const express = require('express');
const router = express.Router();
const databaseService = require('../data/databaseService');
const EXERCISE_COUNT = require('../global/constants/constants').EXERCISE_COUNT;

router.get('/calisthenics', (req, res) => {
  res.render('index', { page: 'calisthenics' });
});

router
  .route('/add-workout')
  .get((req, res) => {
    res.render('index', {
      page: 'forms/add-workout',
      exerciseCount: EXERCISE_COUNT
    });
  })
  .post((req, res) => {
    const workoutHelpers = require('../global/scripts/workoutHelpers');
    const preparedData = workoutHelpers.formatWorkoutData(
      req.body,
      EXERCISE_COUNT
    );

    databaseService.addWorkout(preparedData);
    res.redirect('/');
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
