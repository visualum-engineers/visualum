import React from 'react';
import { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoadingIcon from './components/loadingIcon/LoadingIcon';

import NavWrapper from './components/primaryNavbar/NavWrapper';
import DashboardHome from './components/dashboard/DashboardHome';
import DashboardActivities from './components/dashboard/DashboardActivities';
import DashboardClasses from './components/dashboard/DashboardClasses';
import DashboardClass from './components/dashboard/DashboardClass';

import sampleActivityData from './helpers/sampleActivityData'
import DashboardAssignments from './components/dashboard/DashboardAssignments';
import TestBackend from "./components/testBackend/test"


//lazy loaded components for performance
const Settings = React.lazy(() => import('./components/settingsPage/Settings'))
const HomeContent = React.lazy(() => import('./components/homePage/Home'))
const SignUpForm = React.lazy(() => import('./components/forms/EntryForms/SignUpForm/SignUpForm'))
const LoginForm = React.lazy(() => import('./components/forms/EntryForms/LoginForm/LoginForms'))
const CreateGame = React.lazy(() => import('./components/createGame/CreateGame'))
const Activity = React.lazy(() => import('./components/activityTypes/Activity'))
const LabelPictures = React.lazy(() => import("./components/activityTypes/LabelPictures/LabelPicturesApp"))
const ActivityCreation = React.lazy(() => import("./components/forms/ActivityCreationForm/ActivityCreationForm"))

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={
          <LoadingIcon entireViewport={true} />
        }>
          <Switch>
            <Route
              exact path="/">
              <NavWrapper>
                <HomeContent />
              </NavWrapper>
            </Route>

            <Route exact path="/signup">
              <NavWrapper>
                <SignUpForm />
              </NavWrapper>
            </Route>

            <Route exact path="/login">
              <NavWrapper>
                <LoginForm />
              </NavWrapper>
            </Route>

            <Route exact path="/settings">
              <NavWrapper>
                <Settings />
              </NavWrapper>
            </Route>

            <Route exact path="/create-game">
              <NavWrapper>
                <CreateGame />
              </NavWrapper>
            </Route>

            <Route exact path="/activity">
              <Activity />
            </Route>

            <Route exact path="/activity-creation">
              <ActivityCreation />
            </Route>

            <Route exact path="/label-pictures">
              <NavWrapper>
                <LabelPictures />
              </NavWrapper>
            </Route>

            <Route exact path="/dashboard/home">
              <DashboardHome />
            </Route>
            <Route exact path="/dashboard/activities">
              <DashboardActivities data={sampleActivityData} />
            </Route>
            <Route exact path="/dashboard/assignments">
              <DashboardAssignments />
            </Route>
            <Route exact path="/dashboard/classes/:class_id">
              <DashboardClass />
            </Route>
            <Route exact path="/dashboard/classes">
              <DashboardClasses />
            </Route>
            <Route path="/dashboard">
              <DashboardHome />
            </Route>

            <Route exact path="/testBackend">
              <TestBackend />
            </Route>
          </Switch>
        </Suspense>
      </div >
    </Router >
  );
}
export default App;


