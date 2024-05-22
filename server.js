const express = require('express');
const app = express();
app.use(express.json());
const env = require('dotenv').config;
const supabase = require('./db.js')
const PORT = 6000;

app.post('/workout-plan', async(req, res) => {
      const planName = req.body.planName;
      const exercises = req.body.exercises;
      const duration = req.body.duration;
      const { data: planData, error: planError } = await supabase
      .from('workoutplan')
      .insert([{
        planname: planName
      },])
      for (let exercise of exercises) {
        const { data: exerciseData, error: exerciseError } = await supabase
        .from('exercise')
        .insert([{exercisename: exercise.name, duration: exercise.duration}]);
        if (exerciseError) {
           res.status(500).json({
            error: 'Failed to insert exercise'
           });
           return;
        }
        let wpeError = null;
        if (planData && planData.length > 0 && exerciseData && exerciseData.length > 0) {
         const { data: wpeData, error: wpeError } = await supabase
         .from('workoutplanexercises')
            .insert([{ duration: exercise.duration
            }]);
            wpeError = error;
        }
        if (wpeError) {
           res.status(500).json({
            error: 'Failed to link exercise to workout plan'
           });
           return;
        }
      }
      res.json({message: 'Workout plan created successfully'});
})
































































app.listen(6000, () => console.log(`Server has started on port: ${PORT}`));

module.exports = app;