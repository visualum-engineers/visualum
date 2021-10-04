import React from 'react';
import NavWrapper from './components/navbar/NavWrapper';

import DashboardHome from './components/dashboard/DashboardHome'
import DashboardActivities from './components/dashboard/DashboardActivities';
import DashboardClass from './components/dashboard/DashboardClass';

import HomeContent from './components/homePage/Home';
import Settings from './components/settingsPage/Settings';
import SignUpForm from './components/forms/signUpForm';
import LoginForm from './components/forms/logInForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CreateGame from './components/createGame/CreateGame';
import Activity from './components/activityTypes/Activity'
import LabelPictures from "./components/activityTypes/LabelPictures/LabelPicturesApp"

import sampleActivityData from './helpers/sampleActivityData'

function App() {
  return (
    <Router>
      <div className="App">
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
            <NavWrapper>
              <Activity />
            </NavWrapper>
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
          <Route exact path="/dashboard/classes">
            <DashboardClass />
          </Route>
          <Route path="/dashboard">
            <DashboardHome />
          </Route>

        </Switch>
      </div >
    </Router >
  );
}
export default App;


