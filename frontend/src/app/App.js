import React from 'react';
import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingIcon from './components/utilities/loadingIcon/LoadingIcon';
import DashboardAssignments from './components/dashboard/DashboardAssignments';
import DashboardNothingFound from './components/dashboard/DashboardNothingFound';
import SingleStore from './components/store/SingleStore';
//import { useRealmApp } from '../realm/RealmApp';
//lazy loaded components for performance
const DashboardHome = React.lazy(() => import("./components/dashboard/DashboardOverview"))
const DashboardClasses = React.lazy(() => import("./components/dashboard/DashboardClasses"))
const DashboardClass = React.lazy(() => import("./components/dashboard/DashboardClass"))
const DashboardSettings = React.lazy(() => import("./components/dashboard/DashboardSettings"))
const Dashboard = React.lazy(() => import("./components/dashboard/Dashboard"))
const HomeContent = React.lazy(() => import('./components/homePage/Home'))
const Activity = React.lazy(() => import('./components/activityTypes/Activity'))
const ActivityCreation = React.lazy(() => import("./components/forms/ActivityCreationForm/ActivityCreationForm"))
const StoreOverview = React.lazy(() => import("./components/store/StoreOverview"))
const Store = React.lazy(() => import("./components/store/Store"))
const About = React.lazy(() => import("./components/about/About"))
function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<LoadingIcon entireViewport={true} />}>
          <Routes>
            <Route path="/" element={<HomeContent />} />
            {/* <Route path="/create-game" element={<NavWrapper><CreateGame /></NavWrapper>} /> */}
            <Route path="/activity" element={<Activity />} />
            <Route path="/activity-creation" element={<ActivityCreation />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index path="overview" element={<DashboardHome />} />
              <Route index element={<DashboardHome />} />
              <Route path="assignments" element={<DashboardAssignments />} />
              <Route path="classes/:class_id" element={<DashboardClass />} />
              <Route path="classes" element={<DashboardClasses />} />
              <Route path="settings" element={<DashboardSettings />} />
              <Route path="*" element={<DashboardNothingFound />} />
            </Route>
            <Route path="/about" element={<About/>} />

            <Route path="/store" element={<Store />}>
              <Route path="" element={<StoreOverview />} />
              <Route path="/store/:store_id" element={<SingleStore />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
export default App;