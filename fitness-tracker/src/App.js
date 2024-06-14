import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import WorkoutPlanForm from './components/WorkoutPlanForm';
import ManageWorkoutPlans from './components/ManageWorkoutPlans';
import WorkoutHistory from './components/WorkoutHistory';
import './App.css';
import './index.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-indigo-600 text-white p-6">
    <h1 className="text-5xl font-bold mb-4">Welcome to the Fitness Tracker</h1>
    <p className="text-2xl mb-8">Select 'Create a New Workout Plan' to get started!</p>
    <button
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
      onClick={() => navigate('/create-workout')}
    >
      Create a New Workout Plan
    </button>
  </div>
  );
};

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-1/4 bg-indigo-600 text-white p-6">
          <h2 className="text-2xl font-bold mb-4">Contents</h2>
          <ul>
            <li className="mb-2">
              <Link className="text-indigo-200 hover:text-white focus:outline-none" to="/create-workout">
                Create New Workout Plan
              </Link>
            </li>
            <li className="mb-2">
              <Link className="text-indigo-200 hover:text-white focus:outline-none" to="/manage-workouts">
                Manage Current Workout Plans
              </Link>
            </li>
            <li className="mb-2">
              <Link className="text-indigo-200 hover:text-white focus:outline-none" to="/workout-history">
                Workout History
              </Link>
            </li>
          </ul>
        </div>
      

    {/* Main Content */}
    <div className="w-3/4 p-6">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/create-workout" element={<WorkoutPlanForm/>} />
        <Route path="/manage-workouts" element={<ManageWorkoutPlans/>} />
        <Route path="/manage-workouts/:planname" element={<ManageWorkoutPlans/>} />
        <Route path="/workout-history" element={<WorkoutHistory/>} />
      </Routes>
    </div>
  </div>
    </Router>
  );
}

export default App;
