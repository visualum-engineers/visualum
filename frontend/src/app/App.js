import React from 'react';
import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingIcon from './components/utilities/loadingIcon/LoadingIcon';

import NavWrapper from './components/primaryNavbar/NavWrapper';
import DashboardHome from './components/dashboard/DashboardHome';
import DashboardActivities from './components/dashboard/DashboardActivities';
import DashboardClasses from './components/dashboard/DashboardClasses';
import DashboardClass from './components/dashboard/DashboardClass';
import DashboardSettings from './components/dashboard/DashboardSettings';
import Dashboard from './components/dashboard/Dashboard';

import sampleActivityData from './helpers/sampleActivityData'
import DashboardAssignments from './components/dashboard/DashboardAssignments';
import TestBackend from "./components/testBackend/test"
import AvatarCreator from './components/avatarCreator/AvatarCreator';
import DashboardSettings from './components/dashboard/DashboardSettings';
import { useRealmApp, RealmAppProvider } from "./RealmApp";
export const APP_ID = "application-0-mcywh";

const RequireLoggedInUser = ({ children }) => {
  // Only render children if there is a logged in user.
  const app = useRealmApp();
  return app.currentUser ? children : <LoginScreen />;
};




//lazy loaded components for performance
const Settings = React.lazy(() => import('./components/settingsPage/Settings'))
const HomeContent = React.lazy(() => import('./components/homePage/Home'))
const SignUpForm = React.lazy(() => import('./components/forms/EntryForms/SignUpForm/SignUpForm'))
const LoginForm = React.lazy(() => import('./components/forms/EntryForms/LoginForm/LoginForms'))
const CreateGame = React.lazy(() => import('./components/createGame/CreateGame'))
const Activity = React.lazy(() => import('./components/activityTypes/Activity'))
const ActivityCreation = React.lazy(() => import("./components/forms/ActivityCreationForm/ActivityCreationForm"))

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={
          <LoadingIcon entireViewport={true} />
        }>
          <Routes>
            <Route path="/" element={<NavWrapper><HomeContent /></NavWrapper>} />
            <Route path="/signup" element={<NavWrapper><SignUpForm /></NavWrapper>} />
            <Route path="/login" element={<NavWrapper><LoginForm /></NavWrapper>} />
            <Route path="/settings" element={<NavWrapper><Settings /></NavWrapper>} />
            <Route path="/create-game" element={<NavWrapper><CreateGame /></NavWrapper>} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/activity-creation" element={<ActivityCreation />} />
            <Route path="/dashboard/*" element={<Dashboard />}>
              <Route path="home" element={<DashboardHome />} />
              <Route path="activities" element={<DashboardActivities data={sampleActivityData} />} />
              <Route path="assignments" element={<DashboardAssignments />} />
              <Route path="classes/:class_id" element={<DashboardClass />} />
              <Route path="classes" element={<DashboardClasses />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Route>
            <Route path="/testBackend" element={<TestBackend />} />
          </Routes>
        </Suspense>
      </div >
    </Router >
  );
}
export default App;


