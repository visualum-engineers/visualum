import React from 'react';
import Navbar from './components/navbar/navbar';
import Footer from "./components/footer/footer";
import HomeContent from './components/homePage/home';
import Settings from './components/settingsPage/Settings';
import Form from './components/signUpform/form'
function App() {

  return (
    <div className="wrapper" id="page-background">
      {/*<Navbar/>
      <HomeContent/>
      <Footer/>*/}
      <Form/>
      {/*<Settings />*/}
    </div>

  );
}

export default App;
