import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageWorkoutPlans = () => {
    const [inputPlanName, setInputPlanName] = useState('');
    const [planName, setPlanName] = useState('');
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setInputPlanName(e.target.value);
    };

    const handleFetchPlan = async () => {
        if (inputPlanName.trim() === '') {
            setError('Please enter a workout plan name');
            return;
        }
        setError(null);
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/workout-plan/${inputPlanName}`)
            setPlanName(response.data.planName);
            setExercises(response.data.exercises);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching workout plan:', error);
            setError('Failed to load workout plan');
            setLoading(false);
        }
    };

    const handleExerciseChange = (index,field, value) => {
        const updatedExercises = [...exercises];
        updatedExercises[index][field] = value;
        setExercises(updatedExercises);
    };

     const handleSavePlan = async () => {
        try {
            await axios.put(`http://localhost:5000/workout-plan/${planName}`, {
                exercises
            });
            alert('Workout plan updated successfully');
        } catch (error) {
            console.error('Error updating workout plan:', error);
            setError('Failed to update workout plan');
        }
     }


    const renderContent = () => {
        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            );
        }

        if (!planName) {
            return <div>Enter a workout plan name to acquire your workout plan.</div>;
        }

        return (
            <div className="container mx-auto bg-white shadow-md rounded-lg">
                <div className="mb-6">
                    <label className="block text-indigo-700 text-lg font-semibold mb-2" htmlFor="planName">
                        Workout Plan Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-indigo-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        id="planName"
                        type="text"
                        value={planName}
                        readOnly
                    />
                </div>

                {exercises.map((exercise, index) => (
                <div key={index} className="mb-6 p-4 border rounded bg-indigo-50 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-indigo-700 text-lg font-semibold" htmlFor={`exercise-name-${index}`}>
                            Exercise {index + 1}
                        </label>
                    </div>
                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-indigo-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                        id={`exercise-name-${index}`}
                        type="text"
                        value={exercise.name}
                        onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                    />
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-indigo-700 text-lg font-semibold" htmlFor={`exercise-duration-${index}`}>
                            Duration
                        </label>
                    </div>
                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-indigo-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                        id={`exercise-duration-${index}`}
                        type="text"
                        value={exercise.duration}
                        onChange={(e) => handleExerciseChange(index, 'duration', e.target.value)}
                    />
                </div>
            ))}

            <button
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={handleSavePlan}
            >
                Save Workout Plan
            </button>
        </div>
    );
};

return (
    <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-grow p-6">
            <div className="container mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
                <div className="mb-4">
                    <label className="block text-indigo-700 text-lg font-semibold mb-2" htmlFor="inputPlanName">
                        Enter Workout Plan Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-indigo-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        id="inputPlanName"
                        type="text"
                        value={inputPlanName}
                        onChange={handleInputChange}
                    />
                </div>
                <button
                    className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={handleFetchPlan}
                >
                    Fetch Workout Plan
                </button>
            </div>
            {renderContent()}
        </div>
    </div>
   );
};

export default ManageWorkoutPlans;