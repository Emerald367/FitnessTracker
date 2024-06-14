import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { FaDumbbell, FaClock } from 'react-icons/fa';

const WorkoutHistory = () => {
    const [workoutHistory, setWorkoutHistory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [expandedCard, setExpandedCard] = useState(null); // State to track the expanded card

    useEffect(() => {
        const fetchWorkoutHistory = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://fitnesstracker-ezi6.onrender.com/workout-history');
                console.log('API Response:', response.data);
                const filteredData = response.data.filter(history => history.workoutdate !== null);
                setWorkoutHistory(filteredData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching workout history:', error);
                setError('Failed to load workout history');
            } finally {
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
                    <div key={index} className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${expandedCard === index ? 'expanded' : ''} `} onClick={() => handleCardClick(index)}>
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-indigo-700">{history.completedplanname}</h3>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <FaClock className="w-6 h-6 mr-2 text-indigo-500" />
                            <span>{format(parseISO(history.workoutdate), 'MMMM d, yyyy')}</span>
                        </div>
                        {expandedCard === index && (
                            <div className="mt-4 transition-all duration-300 ease-in-out overflow-hidden bg-gray-100 p-4 rounded-lg">
                                {(history.exercises && Array.isArray(history.exercises)) ? (
                                    history.exercises.map((exercise, i) => (
                                        <div key={i} className="mt-2 flex items-center">
                                            <FaDumbbell className="w-5 h-5 text-indigo-500 mr-2" />
                                            <div>
                                                <div className="font-semibold text-gray-800">{exercise.name}</div>
                                                <div className="text-gray-600">Duration: <span className="text-indigo-600 font-semibold">{exercise.duration}</span></div>
                                            </div>
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