import React, { useState } from 'react';
import axios from 'axios';

const WorkoutPlanForm = () => {
    const [planName, setPlanName] = useState('');
    const [exercises, setExercises] = useState([{ name: '', duration: '' }]);

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
            console.error('Error creating workout plan', error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-1/4 bg-indigo-600 text-white p-6">
                <h2 className="text-2xl font-bold mb-4">Contents</h2>
                <ul>
                    <li className="mb-2"><button className="text-indigo-200 hover:text-white focus:outline-none" onClick={() => alert('Create New Workout Plan clicked')}>
                    Create New Workout Plan
                </button></li>
                    <li className="mb-2"><button className="text-indigo-200 hover:text-white focus:outline-none" onClick={() => alert('Edit Current Workout Plans clicked')}>
                    Edit Current Workout Plans
                </button></li>
                    <li className="mb-2"> <button className="text-indigo-200 hover:text-white focus:outline-none" onClick={() => alert('Workout History clicked')}>
                    Workout History
                </button></li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-6">
                <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
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
                                />
                                <input
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-indigo-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    id={`exercise-duration-${index}`}
                                    type="text"
                                    name="duration"
                                    placeholder="Duration"
                                    value={exercise.duration}
                                    onChange={(e) => handleExerciseChange(index, e)}
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