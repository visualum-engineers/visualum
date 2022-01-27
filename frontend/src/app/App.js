import React from 'react';
import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingIcon from './components/utilities/loadingIcon/LoadingIcon';
import DashboardAssignments from './components/dashboard/DashboardAssignments';
import TestBackend from "./components/testBackend/test"
import DashboardNothingFound from './components/dashboard/DashboardNothingFound';
//import { useRealmApp } from '../realm/RealmApp';
//lazy loaded components for performance
const DashboardHome = React.lazy(() => import("./components/dashboard/DashboardHome"))
const DashboardClasses = React.lazy(() => import("./components/dashboard/DashboardClasses"))
const DashboardClass = React.lazy(() => import("./components/dashboard/DashboardClass"))
const DashboardSettings = React.lazy(() => import("./components/dashboard/DashboardSettings"))
const Dashboard = React.lazy(() => import("./components/dashboard/Dashboard"))

const NavWrapper = React.lazy(() => import("./components/primaryNavbar/NavWrapper"))
const Settings = React.lazy(() => import('./components/settingsPage/Settings'))
const HomeContent = React.lazy(() => import('./components/homePage/Home'))
const SignUpForm = React.lazy(() => import('./components/forms/EntryForms/SignUpForm/SignUpForm'))
const LoginForm = React.lazy(() => import('./components/forms/EntryForms/LoginForm/LoginForms'))
const CreateGame = React.lazy(() => import('./components/createGame/CreateGame'))
const Activity = React.lazy(() => import('./components/activityTypes/Activity'))

//const Activity = React.lazy(() => import('../redux/containers/ActivityContainer'))
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
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index path="home" element={<DashboardHome />} />
              <Route index element={<DashboardHome />} />
              <Route path="assignments" element={<DashboardAssignments />} />
              <Route path="classes/:class_id" element={<DashboardClass />} />
              <Route path="classes" element={<DashboardClasses />} />
              <Route path="settings" element={<DashboardSettings />} />
              <Route path="*" element={<DashboardNothingFound />} />
            </Route>
            <Route path="/testBackend" element={<TestBackend />} />
          </Routes>
        </Suspense>
      </div >
    </Router >
  );
}
export default App;