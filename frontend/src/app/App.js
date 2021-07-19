import React from 'react';
import Navbar from './components/navbar/navbar'
import Footer from "./components/footer/footer"
import HomeContent from './components/homePage/home';
function App() {
  
  return (
    <div className= "wrapper" id="page-background">
      <Navbar/>
      <HomeContent/>
      <Footer/>
    </div>
    
  );
}

export default App;
