function formatWorkoutData(workout, exerciseCount) {
  const preparedData = {
    type: workout.type,
    date: workout['creation-date'],
    exercises: []
  };

  for (let i = 1; i <= exerciseCount; i++) {
    const exerciseName = workout['exercise-' + i];
    const exerciseWeight = workout['weight-' + i];
    const exerciseReps = workout['reps-' + i];

    if (exerciseName && exerciseWeight && exerciseReps) {
      preparedData.exercises.push({
        name: exerciseName,
        weight: exerciseWeight,
        reps: exerciseReps
      });
    }
  }

  return preparedData;
}

module.exports = {
  formatWorkoutData
};
