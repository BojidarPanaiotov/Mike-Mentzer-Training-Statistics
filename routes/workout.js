const express = require('express');
const router = express.Router();
const databaseService = require('../data/databaseService');
const EXERCISE_COUNT = require('../global/constants/constants').EXERCISE_COUNT;
const TOP_EXERCISE_COUNT = require('../global/constants/constants').TOP_EXERCISE_COUNT;
const ALL_EXERCISES = require('../global/constants/constants').ALL_EXERCISES;

router.get('/workouts', function (req, res) {
  const workoutNames = req.query.workouts;
  const workouts = databaseService.getAll().filter((w) => workoutNames.includes(w.type));
  const workoutsSortedByDate = databaseService.sortWorkoutsByDate(workouts).slice(0,2);
  const workoutsSortedByName = databaseService.sortByName(workoutsSortedByDate);
  res.json({ workouts: workoutsSortedByName });
});

router.get('/statistics', (req, res) => {
  res.render('index', {
    page: 'statistics',
    workouts: databaseService.getAll(),
    regularExercises: databaseService.getMostRegularExercises(TOP_EXERCISE_COUNT),
    repsExercises: databaseService.getMostRepsExercises(TOP_EXERCISE_COUNT),
    totalExercises: databaseService.getTotalExercises()
  });
});

router
  .route('/add-workout')
  .get((req, res) => {
    res.render('index', {
      page: 'forms/add-workout',
      exerciseCount: EXERCISE_COUNT,
      ALL_EXERCISES: ALL_EXERCISES
    });
  })
  .post((req, res) => {
    const workoutHelpers = require('../global/scripts/workoutHelpers');
    const preparedData = workoutHelpers.formatWorkoutData(req.body, EXERCISE_COUNT);
    databaseService.addWorkout(preparedData);

    res.redirect('/');
  });

module.exports = router;
