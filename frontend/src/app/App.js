import React from 'react';
import Navbar from './components/navbar/navbar';
import Footer from "./components/footer/footer";
import HomeContent from './components/homePage/home';
import Settings from './components/settingsPage/Settings';
function App() {

  return (
    <div className="wrapper" id="page-background">
      {/* <Navbar/>
      <HomeContent/>
      <Footer/> */}
      <Settings />
    </div>

  );
}

export default App;
