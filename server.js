const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors({
   origin: 'http://localhost:3000',
}));
const env = require('dotenv').config;
const supabase = require('./db.js')
const PORT = 5000;

app.post('/workout-plan', async(req, res) => {
      const planName = req.body.planName;
      const exercises = req.body.exercises;

      //Validate request body
      if (!planName || !Array.isArray(exercises) || exercises.length === 0) {
         res.status(400).json({error: 'Invalid request payload'});
         return;
      }
 
      try{
         // Insert into workoutplan
         const { data: planData, error: planError } = await supabase
      .from('workoutplan')
      .insert([{
        planname: planName
      }]).select().single();

      if (planError) {
         console.error('Plan insertion error:', planError);
         res.status(500).json({error: 'Failed to create workout plan' })
         return;
      }

      console.log('Inserted plan data:', planData);
      const planID = planData.planid //Get the planid of the inserted workout plan

      for (let exercise of exercises) {
         //Insert into exercises
        const { data: exerciseData, error: exerciseError } = await supabase
        .from('exercise')
        .insert([{exercisename: exercise.name, duration: exercise.duration}])
        .select()
        .single();

        if (exerciseError) {
           console.error('Exercise insertion error:', exerciseError);
           res.status(500).json({
            error: 'Failed to insert exercise'
           });
           return;
        }

        // Get the exerciseid of the inserted exercise
        const exerciseID = exerciseData.exerciseid; 


         // Insert into workoutplanexercises
         const { data: wpeData, error: wpeError } = await supabase
         .from('workoutplanexercises')
            .insert([{ planid: planID, exerciseid: exerciseID
            }]);
        

        if (wpeError) {
           console.error('Workout plan exercises insertion error', wpeError);
           res.status(500).json({
            error: 'Failed to link exercise to workout plan'
           });
           return;
        }
      }

      res.json({message: 'Workout plan created successfully'});
      } catch (error) {
         console.error('Unexpected error:', error);
         res.status(500).json({error: 'Unexpected server error'})
      }

});


app.post('/workout-history', async (req, res) => {
   const { completedPlanName, workoutDate } = req.body;

   if (!completedPlanName || !workoutDate) {
      res.status(400).json({ error: 'Invalid request payload'});
      return;
   }

   try {
      
      const {data, error} = await supabase
      .from('workouthistory')
      .insert([{completedplanname: completedPlanName, workoutdate: workoutDate}])
      .single();

      if (error) {
         console.error('Workout history insertion error', error);
         res.status(500).json({ error: 'Failed to record workout history'});
         return;
      }

      res.json({ message: 'Workout history recorded successfully' });




   } catch (error) {
      console.error('Unexpected error:', error);
      res.status(500).json({error: 'Unexpected server error'})
   }

});
































































app.listen(5000, () => console.log(`Server has started on port: ${PORT}`));

module.exports = app;