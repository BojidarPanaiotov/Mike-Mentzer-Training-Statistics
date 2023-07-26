const EXERCISE_COUNT = 6;
const TOP_EXERCISE_COUNT = 5;
const DATABASE_PATH = 'data/workouts.json';
const ALL_EXERCISES = {
  WORKOUT_TYPES: ['Chest & Back', 'Legs & Abs', 'Shoulders & Arms'],
  PUSH: ['Dumbbell Lateral Raises', 'Machine Lateral Deltoids', 'Triceps Cable', 'Dumbbell Reverse Flyes', 'Machine Peck Back Shoulder', 'Machine Chest Flyes', 'Upper Bench Press'],
  PULL: ['Pulldown Bicep Curl', 'Pull Ups', 'Dead Lift', 'Lat Pull Down Cable'],
  LEGS: ['Leg Press', 'Leg Extension', 'Calf Rise', 'Seated Calf Rise', 'Adductor Machine'],
  ABS: ['Sit Ups']
};

module.exports = {
  EXERCISE_COUNT,
  TOP_EXERCISE_COUNT,
  DATABASE_PATH,
  ALL_EXERCISES
};
