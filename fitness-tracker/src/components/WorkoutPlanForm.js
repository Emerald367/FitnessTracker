import React, { useState } from 'react';
import axios from 'axios';

const WorkoutPlanForm = () => {
    const [planName, setPlanName] = useState('');
    const [exercises, setExercises] = useState([{ name: '', duration: '' }]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); //New state for success message

    const handleExerciseChange = (index, event) => {
        const newExercises = exercises.map((exercise, exerciseIndex) => {
            if (index !== exerciseIndex) return exercise;
            return { ...exercise, [event.target.name]: event.target.value };
        });
        setExercises(newExercises);
    };

    const handleAddExercise = () => {
        setExercises([...exercises, { name: '', duration: '' }]);
    };

    const handleRemoveExercise = (index) => {
        const newExercises = exercises.filter((_, exerciseIndex) => index !== exerciseIndex);
        setExercises(newExercises);
    };

    const resetForm = () => {
        setPlanName('');
        setExercises([{name: '', duration: ''}]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            planName,
            exercises
        };

        try {
            const response = await axios.post('http://localhost:5000/workout-plan', payload);
            console.log(response.data);
            setSuccessMessage('Workout plan created succesfully!');
            setError(null); //Clear previous errors
            resetForm();
        } catch (error) {
            if (error.response) {
              console.error('Error creating workout plan', error.response.data);
              setError('Error creating workout plan: ' + error.response.data.error);
            } else {
              console.error('Error creating workout plan', error.message);
              setError('Error creating workout plan' + error.message);
            }
            setSuccessMessage(null); //Clear previous success messages
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="flex-grow p-6">
                <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
                  {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                      <strong className="font-bold">Error: </strong>
                      <span className="block sm:inline">{error}</span>
                      <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
                          <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title>< path d="M14.348 5.652a.5.5 0 1 0-.707-.707L10 8.586 6.36 4.945a.5.5 0 1 0-.707.707l3.646 3.646-3.646 3.646a.5.5 0 0 0 .707.707L10 10.414l3.64 3.64a.5.5 0 0 0 .707-.707L10.707 10l3.641-3.641z"/></svg>
                      </span>
                    </div>}
                    {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                       <strong className="font-bold">Success: </strong>
                       <span className="block sm:inline">{successMessage}</span>
                       <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setSuccessMessage(null)}>
                          <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 5.652a.5.5 0 1 0-.707-.707L10 8.586 6.36 4.945a.5.5 0 1 0-.707.707l3.646 3.646-3.646 3.646a.5.5 0 0 0 .707.707L10 10.414l3.64 3.64a.5.5 0 0 0 .707-.707L10.707 10l3.641-3.641z"/></svg>
                       </span>
                        </div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-indigo-700 text-lg font-semibold mb-2" htmlFor="planName">
                                Workout Plan Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-indigo-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                id="planName"
                                type="text"
                                placeholder="Enter workout plan name"
                                value={planName}
                                onChange={(e) => setPlanName(e.target.value)}
                                required
                            />
                        </div>

                        {exercises.map((exercise, index) => (
                            <div key={index} className="mb-6 p-4 border rounded bg-indigo-50 shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-indigo-700 text-lg font-semibold" htmlFor={`exercise-name-${index}`}>
                                        Exercise {index + 1}
                                    </label>
                                    <button
                                        type="button"
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleRemoveExercise(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                                <input
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-indigo-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                    id={`exercise-name-${index}`}
                                    type="text"
                                    name="name"
                                    placeholder="Exercise name"
                                    value={exercise.name}
                                    onChange={(e) => handleExerciseChange(index, e)}
                                    required
                                />
                                <input
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-indigo-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    id={`exercise-duration-${index}`}
                                    type="text"
                                    name="duration"
                                    placeholder="Duration"
                                    value={exercise.duration}
                                    onChange={(e) => handleExerciseChange(index, e)}
                                    required
                                />
                            </div>
                        ))}

                        <div className="flex justify-between items-center">
                            <button
                                type="button"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                                onClick={handleAddExercise}
                            >
                                Add Exercise
                            </button>
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
                            >
                                Create Workout Plan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WorkoutPlanForm;