// routes.js
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import NavbarLayout from './layouts/NavbarLayout'; // Navbar layout
import Login from './components/AuthComponents/Login';
import SignUp from './components/AuthComponents/Signup';
import Layout from './layouts/DashboardLayout'; // Sidebar layout
import MainContent from './sections/DashboardPage'; // Default Dashboard content
import Exercises from './sections/ExercisesPage'; // Exercises page
import FitnessPage from './pages/FitnessPage'; // Fitness Page
import Home from './pages/Home'; // Home component
import ExercisePreview from './sections/ExercisePreview';
import ExerciseList from './sections/ExerciseList';
import ExerciseCustomisation from './sections/ExerciseCustomisation';
import HomeDashboard from './pages/HomeDashboard'; // Home Dashboard component
import ExercisePage from './components/ExercisePageC/ExercisePage';
import ExerciseProgress from './sections/ExeProgress';
import Loader from './Loader';
import Workout from './AllExerciseInfo/workout';
import Exercise from './AllExerciseInfo/exercise';
import TempGraph from './components/Graphs/TempGraph';
import YogaDashboard from './sections/Yoga/YogaDashboard';
import Yogas from './sections/Yoga/Yogas';
import YogaList from './sections/Yoga/YogaList';
import CustomizeYogas from './sections/Yoga/CustomizeYogas';
import YogaProgress from './sections/Yoga/YogaProgress';
import YogaAI from './sections/Yoga/YogaAI';
import YogaPage from "./sections/Yoga/YogaPage";

import {
  updatelistLymphaticWorkout,
  exerlistLymphaticWorkout,
  evaluate1LymphaticWorkout,
  evaluate2LymphaticWorkout,
  lymph_met_time,
  lymph_audiosource,
} from './AllExerciseInfo/LymphaticWorkout';
import {
  updatelistLegWorkout,
  exerlistLegWorkout,
  evaluate1LegWorkout,
  evaluate2LegWorkout,
  leg_met_time,
  leg_audiosource,
} from './AllExerciseInfo/LegWorkout';
import {
  evaluate2ArmsWorkout,
  evaluate1ArmsWorkout,
  exerlistArmsWorkout,
  updatelistArmsWorkout,
  arms_met_time,
  arms_audiosource,
} from './AllExerciseInfo/ArmsWorkout';

import {
  updatelistWaistlineWorkouts,
  exerlistWaistlineWorkouts,
  evaluate1WaistlineWorkouts,
  evaluate2WaistlineWorkouts,
  met_time,
  audiosource,
} from './AllExerciseInfo/WaistlineWorkouts';

import {
  updatelistThreadmill_HK_S1,
  exerlistThreadmill_HK_S1,
  evaluate1Threadmill_HK_S1,
  evaluate2Threadmill_HK_S1,
  thread_met_time,
  thread_audiosource,
} from './AllExerciseInfo/Threadmill_HK_S1';

import {
  evaluate2Threadmill_S2,
  evaluate1Threadmill_S2,
  exerlistThreadmill_S2,
  updatelistThreadmill_S2,
  thread2_met_time,
  thread2_audiosource,
} from './AllExerciseInfo/Threadmill_S2';

import {
  evaluate1ShoulderWorkouts,
  evaluate2ShoulderWorkouts,
  exerlistShoulderWorkouts,
  shoulder_audiosource,
  shoulder_met_time,
  updatelistShoulderWorkouts,
} from './AllExerciseInfo/ShoulderWorkouts';

import {
  evaluate2BackWorkout,
  evaluate1BackWorkout,
  exerlistBackWorkout,
  updatelistBackWorkout,
  back_met_time,
  back_audiosource,
} from './AllExerciseInfo/BackWorkout';

import {
  evaluate2CoreWorkout,
  evaluate1CoreWorkout,
  exerlistCoreWorkout,
  updatelistCoreWorkout,
  core_met_time,
  core_audiosource,
} from './AllExerciseInfo/CoreWorkout';
import Aichatbot from './components/ai_component/Aichatbot';

function AppRoutes () {
  const [loading, setLoading] = React.useState (true);

  // This useEffect will handle the loading delay
  React.useEffect (() => {
    // Simulate loading resources with a delay of 2 seconds
    const loadingDelay = setTimeout (() => {
      setLoading (false); // Hide loader after delay
    }, 500); // 2000 ms = 2 seconds

    // Clean up the timeout if the component unmounts before it finishes
    return () => clearTimeout (loadingDelay);
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) {
    // Display the loader while the page is still loading
    return <Loader />;
  }

  return (
    <Routes>
      {/* Routes for Navbar Layout (Home, Fitness, etc.) */}
      <Route element={<NavbarLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/fitness" element={<FitnessPage />} />
        {/* Add other navbar routes here if needed */}
      </Route>

      {/* Routes for Dashboard Layout with Sidebar */}
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<MainContent />} />
        {' '}
        {/* Default dashboard content */}
        <Route path="exercises" element={<Exercises />} />
        {' '}
        {/* Exercises page */}
        <Route path="exercises/preview/:id" element={<ExercisePreview />} />
        {' '}
        {/* Exercise preview page */}
        <Route path="exerciseList" element={<ExerciseList />} />
        {' '}
        {/* Exercise List page */}
        <Route
          path="exerciseCustomisation"
          element={<ExerciseCustomisation />}
        />
        {' '}
        {/* Exercise Customisation page */}
        <Route path="exerciseProgress" element={<ExerciseProgress />} />
        <Route path="ai-assistance" element={<Aichatbot />} />
      </Route>

      {/* Yoga Dashboard Layout */}
      <Route path="/yoga" element={<Layout />}>
        <Route index element={<YogaDashboard />} />
        <Route path="yogas" element={<Yogas />} />
        <Route path="yoga-list" element={<YogaList />} />
        <Route path="customize-yogas" element={<CustomizeYogas />} />
        <Route path="progress" element={<YogaProgress />} />
        <Route path="ai-assistance" element={<YogaAI />} />
        {/* <Route path="/yoga" element={<YogaPage />} /> */}
      </Route>


      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/ExercisePage/:moduleName" element={<Workout />} />
      <Route path="/Exercise/:exerciseName" element={<Exercise />} />
      <Route path="/user/tempgraph" element={<TempGraph />} />
      
    </Routes>
  );
}

export default AppRoutes;
