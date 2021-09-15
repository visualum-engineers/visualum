import React from 'react';
import Navbar from './components/navbar/navbar';
import Footer from "./components/footer/footer";
import HomeContent from './components/homePage/home';
import Settings from './components/settingsPage/Settings';
import SignUpForm from './components/forms/signUpForm';
import LoginForm from './components/forms/logInForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CreateGame from './components/createGame/CreateGame';
import Activity from './components/activityTypes/Activity'
import LabelPictures from "./components/activityTypes/labelPictures/labelPicturesApp"
import Dashboard from './components/dashboard/dashboard'
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route
            exact path="/">
            <HomeContent />
          </Route>
          <Route exact path="/signup">
            <SignUpForm />
          </Route>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/create-game">
            <CreateGame />
          </Route>
          <Route exact path="/activity">
            <Activity />
          </Route>
          <Route exact path="/labelPictures">
            <LabelPictures />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
        <Footer />
      </div >
    </Router >
  );
}
export default App;