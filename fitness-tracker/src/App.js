import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WorkoutPlanForm from './components/WorkoutPlanForm';
import ManageWorkoutPlans from './components/ManageWorkoutPlans';
import WorkoutHistory from './components/WorkoutHistory';
import './App.css';
import './index.css';

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
        <Route path="/" element={<div>Welcome to the Fitness Tracker. Select 'Create a New Workout Plan' to get started!</div>} />
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
