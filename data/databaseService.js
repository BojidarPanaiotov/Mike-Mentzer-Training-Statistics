const DATABASE_PATH = require('../global/constants/constants').DATABASE_PATH;
const fs = require('fs');

function addWorkout(newWorkout) {
  let file = fs.readFileSync(DATABASE_PATH);
  let data = JSON.parse(file);
  data.workouts.push(newWorkout);

  let newData = JSON.stringify(data);
  fs.writeFile(DATABASE_PATH, newData, (err) => {
    if (err) {
      throw err;
    }
  });
}

function getAll() {
  const file = fs.readFileSync(DATABASE_PATH);
  const data = JSON.parse(file);

  return data.workouts;
}

function getMostRegularExercises(top) {
  const allWorkouts = getAll();
  const exercises = [];

  for (const workout of allWorkouts) {
    for (const exercise of workout.exercises) {
      if (exercises.filter((w) => w.name === exercise.name).length === 0) {
        exercises.push({ name: exercise.name, count: 1 });
      } else {
        const index = exercises.findIndex((w) => w.name === exercise.name);
        exercises[index].count++;
      }
    }
  }

  return exercises.sort((a, b) => (a.count > b.count ? -1 : 1)).slice(0, top);
}

function getMostRepsExercises(top) {
  const allWorkouts = getAll();
  const reps = [];

  for (const workout of allWorkouts) {
    for (const exercise of workout.exercises) {
      if (reps.filter((w) => w.name === exercise.name).length === 0) {
        const repsAsNumber = Number(exercise.reps);

        reps.push({ name: exercise.name, reps: repsAsNumber });
      } else {
        const index = reps.findIndex((w) => w.name === exercise.name);
        const repsAsNumber = Number(exercise.reps);

        reps[index].reps += repsAsNumber;
      }
    }
  }

  return reps.sort((a, b) => (a.reps > b.reps ? -1 : 1)).slice(0, top);
}

function getTotalExercises() {
  const allWorkouts = getAll();
  let total = 0;

  for (const workout of allWorkouts) {
    const totalExercisesAsNumber = Number(workout.exercises.length);
    total += totalExercisesAsNumber;
  }

  return total;
}

module.exports = {
  addWorkout,
  getAll,
  getMostRegularExercises,
  getMostRepsExercises,
  getTotalExercises
};
