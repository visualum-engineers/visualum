import React from 'react';
import Navbar from './components/navbar/navbar';
import Footer from "./components/footer/footer";
import HomeContent from './components/homePage/home';
import Settings from './components/settingsPage/Settings';
import SignUpForm from './components/forms/signUpForm';
import LoginForm from './components/forms/logInForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CreateGame from './components/createGame/CreateGame';
import SortActivity from './components/gameTypes/SortActivity/SortActivityApp'
import MatchActivity from './components/gameTypes/MatchActivity/MatchActivityApp'
import MultipleChoice from "./components/gameTypes/MultipleChoice/MultipleChoiceApp"
import ShortAnswer from "./components/gameTypes/ShortAnswer/ShortAnswerApp"
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
          <Route exact path="/sortActivity">
            <SortActivity />
          </Route>
          <Route exact path="/matchActivity">
            <MatchActivity />
          </Route>
          <Route exact path="/multipleChoice">
            <MultipleChoice />
          </Route>
          <Route exact path="/shortAnswer">
            <ShortAnswer />
          </Route>
        </Switch>
        <Footer />
      </div >
    </Router >
  );
}
export default App;