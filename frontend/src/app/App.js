import React from 'react';
import Navbar from './components/navbar/navbar';
import Footer from "./components/footer/footer";
import HomeContent from './components/homePage/home';
import Settings from './components/settingsPage/Settings';
import SignUpForm from './components/forms/signUpform';
function App() {
  return (
    <div className="App">
      <Navbar />
      <HomeContent />
      <Footer />
      {/* <SignUpForm /> */}
      {/* <Settings /> */}
    </div>
  );
}
export default App;