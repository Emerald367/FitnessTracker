import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkoutHistoryCard from './WorkoutHistory';

const ManageWorkoutPlans = () => {
    const [inputPlanName, setInputPlanName] = useState('');
    const [planName, setPlanName] = useState('');
    const [newPlanName, setNewPlanName] = useState('');
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [workoutHistory, setWorkoutHistory] = useState([]);

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
            const response = await axios.get(`https://fitnesstracker-ezi6.onrender.com/workout-plan/${inputPlanName}`);
            console.log('Fetched plan data:', response.data);
            setPlanName(response.data.planName);
            setNewPlanName(response.data.planName);
            setExercises(response.data.exercises);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching workout plan:', error);
            setError('Failed to load workout plan');
            setLoading(false);
        }
    };

    const handleExerciseChange = (index, field, value) => {
        const updatedExercises = [...exercises];
        updatedExercises[index][field] = value;
        setExercises(updatedExercises);
    };

    const handleSavePlan = async () => {
        try {
            const updatedExercises = exercises.map((exercise) => ({
                exerciseid: exercise.exerciseid,
                name: exercise.name,
                duration: exercise.duration,
            }));
            console.log('Payload:', {
                newPlanName,
                exercises: updatedExercises,
            });
            await axios.put(`https://fitnesstracker-ezi6.onrender.com/workout-plan/${planName}`, {
                newPlanName,
                exercises: updatedExercises,
            });
            alert('Workout plan updated successfully');
        } catch (error) {
            console.error('Error updating workout plan:', error.response ? error.response.data : error.message);
            setError('Failed to update workout plan');
        }
    };

    const handleDeletePlan = async () => {
        try {
            await axios.delete(`https://fitnesstracker-ezi6.onrender.com/workout-plan/${encodeURIComponent(planName)}`);
            alert('Workout plan deleted successfully');
            setPlanName('');
            setNewPlanName('');
            setExercises([]);
            setShowDeleteConfirm(false);
        } catch (error) {
            console.error('Error deleting workout plan:', error);
            setError(error.response?.data?.error || 'Failed to delete workout plan');
        }
    };

    const handleFinishPlan = async () => {
        const workoutDate = new Date().toISOString().split('T')[0];
        try {
            const response = await axios.post('https://fitnesstracker-ezi6.onrender.com/workout-history', {
                completedPlanName: planName,
                workoutDate,
                exercises
            });
            alert('Congratulations! Workout plan completed');
            setWorkoutHistory([...workoutHistory, { completedPlanName: planName, workoutDate, exercises }]);
        } catch (error) {
            console.error('Error finishing workout plan:', error);
            setError('Failed to finish workout plan');
        }
    };

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
            return <div>Enter your plan name to acquire your workout plan.</div>;
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
                        value={newPlanName}
                        onChange={(e) => setNewPlanName(e.target.value)}
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

                <button
                    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ml-4"
                    onClick={() => setShowDeleteConfirm(true)}
                >
                    Delete Workout Plan
                </button>

                <button
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ml-4"
                    onClick={handleFinishPlan}
                >
                    Finish Plan
                </button>
                {showDeleteConfirm && (
                    <div className="mt-4 p-4 border border-red-600 bg-red-100 rounded-lg">
                        <p>Are your sure you want to delete this workout plan?</p>
                        <button
                            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 mr-2"
                            onClick={handleDeletePlan}
                        >
                            Yes, delete it
                        </button>
                        <button
                            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            onClick={() => setShowDeleteConfirm(false)}
                        >
                            No, keep it
                        </button>
                    </div>
                )}
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
                <div>
                    {workoutHistory.map((history, index) => (
                        <WorkoutHistoryCard key={index} planName={history.completedPlanName} workoutDate={history.workoutDate} exercises={history.exercises} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageWorkoutPlans;