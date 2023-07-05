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

function sortWorkoutsByDate(workouts) {
  return workouts.sort((a, b) => {
    const aComps = a.date.split('-');
    const bComps = b.date.split('-');
    const aDate = new Date(aComps[0], Number(aComps[1]) - 1, aComps[2]);
    const bDate = new Date(bComps[0], Number(bComps[1]) - 1, bComps[2]);
     return bDate.getTime() - aDate.getTime();
  });
}

function sortByName(workouts) {
  const workoutExerciseOne = [];
  const singleExerciseOne = [];

  const workoutExerciseTwo = [];
  const singleExerciseTwo = [];

  if (workouts.length === 2) {
    for (const exercise of workouts[0].exercises) {
      const exerciseName = exercise.name;
      const hasSameExercise = workouts[1].exercises.filter((e) => e.name === exerciseName);

      if (hasSameExercise.length) {
        workoutExerciseOne.push(hasSameExercise[0]);
      } else {
        singleExerciseOne.push(exercise);
      }
    }

    for (const exercise of workouts[1].exercises) {
      const exerciseName = exercise.name;
      const hasSameExercise = workouts[0].exercises.filter((e) => e.name === exerciseName);

      if (hasSameExercise.length) {
        workoutExerciseTwo.push(hasSameExercise[0]);
      } else {
        singleExerciseTwo.push(exercise);
      }
    }

    const sortFunction = function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    };

    workoutExerciseOne.sort(sortFunction);
    workoutExerciseTwo.sort(sortFunction);

    const workoutOneResult = workoutExerciseOne.concat(singleExerciseOne);
    const workoutTwoResult = workoutExerciseTwo.concat(singleExerciseTwo);

    return [
      {
        type: workouts[0].type,
        date: workouts[0].date,
        exercises: workoutOneResult
      },
      {
        type: workouts[1].type,
        date: workouts[1].date,
        exercises: workoutTwoResult
      }
    ];
  }
}

module.exports = {
  addWorkout,
  getAll,
  getMostRegularExercises,
  getMostRepsExercises,
  getTotalExercises,
  sortWorkoutsByDate,
  sortByName
};
