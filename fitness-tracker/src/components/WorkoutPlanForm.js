import React, { useState } from 'react';
import axios from 'axios';

const WorkoutPlanForm = () => {
    const [planName, setPlanName] = useState('');
    const [exercises, setExercises] = useState([{name: '', duration:''}]);

    const handleExerciseChange = (index, event) => {
        const newExercises = exercises.map((exercise, exerciseIndex) => {
            if (index !== exerciseIndex) return exercise;
            return { ...exercise, [event.target.name]: event.target.value};
        });
        setExercises(newExercises);
    };

    const handleAddExercise = () => {
        setExercises([...exercises, {name: '', duration: ''}]);
    };

    const handleRemoveExercise = (index) => {
        const newExercises = exercises.filter((_, exerciseIndex) => index !== exerciseIndex);
        setExercises(newExercises);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            planName, 
            exercises
        };
    

    try {
        const response = await axios.post('http://localhost:6000/workout-plan', payload);
        console.log(response.data);
    } catch (error) {
        console.error('Error creating workout plan', error)
    }
};

return (
    <div className="container mx-auto p-4">
     <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="planName">
            Workout Plan Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="planName"
          type="text"
          placeholder="Enter workout plan name"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
        />
      </div>

      {exercises.map((exercise, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`exercise-${index}`}>
            Exercise {index + 1}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            id={`exercise-name-${index}`}
            type="text"
            name="name"
            placeholder="Exercise name"
            value={exercise.name}
            onChange={(e) => handleExerciseChange(index, e)}
         />
         <input
           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           id={`exercise-duration-${index}`}
           type="text"
           name="duration"
           placeholder="Duration"
           value={exercise.duration}
           onChange={(e) => handleExerciseChange(index, e)}
         />
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={() => handleRemoveExercise(index)}
        >
          Remove Exercise
        </button>
        </div>
      ))}

      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddExercise}
      >
        Add Exercise
      </button>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Create Workout Plan
      </button>

     </form>
    </div>
);
};
export default WorkoutPlanForm