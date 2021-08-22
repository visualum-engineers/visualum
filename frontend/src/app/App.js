import React from 'react';
import Navbar from './components/navbar/navbar';
import Footer from "./components/footer/footer";
import HomeContent from './components/homePage/home';
import Settings from './components/settingsPage/Settings';
import SignUpForm from './components/forms/SignUpform';
import LoginForm from './components/forms/logInForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

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
        </Switch>
        <Footer />
      </div >
    </Router >
  );
}
export default App;