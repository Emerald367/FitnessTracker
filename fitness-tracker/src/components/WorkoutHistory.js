import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

const WorkoutHistory = () => {
    const [workoutHistory, setWorkoutHistory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [expandedCard, setExpandedCard] = useState(null); // State to track the expanded card

    useEffect(() => {
        const fetchWorkoutHistory = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/workout-history');
                console.log('API Response:', response.data);
                const filteredData = response.data.filter(history => history.workoutdate !== null);
                setWorkoutHistory(filteredData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching workout history:', error);
                setError('Failed to load workout history');
                setLoading(false);
            }
        };

        fetchWorkoutHistory();
    }, []);

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

    const handleCardClick = (index) => {
        setExpandedCard(expandedCard === index ? null : index);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Workout History</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workoutHistory.map((history, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" onClick={() => handleCardClick(index)}>
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-indigo-700">{history.completedplanname}</h3>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10m-4 5h3m-3 4h3m-6-8h3m-3 4h3m-3 4h3"></path></svg>
                                <span>{format(parseISO(history.workoutdate), 'MMMM d, yyyy')}</span>
                            </div>
                            {expandedCard === index && (
                                <div className="mt-4">
                                    {(history.exercises && Array.isArray(history.exercises)) ? (
                                        history.exercises.map((exercise, i) => (
                                            <div key={i} className="mt-2">
                                                <div className="font-semibold text-gray-800">{exercise.name}</div>
                                                <div className="text-gray-600">Duration: {exercise.duration}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-gray-600">No exercises recorded.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkoutHistory;