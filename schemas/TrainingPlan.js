const mongoose = require('mongoose');

const trainingPlanSchema = new mongoose.Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('TrainingPlan', trainingPlanSchema);