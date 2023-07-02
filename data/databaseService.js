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

module.exports = {
  addWorkout,
  getAll
};
