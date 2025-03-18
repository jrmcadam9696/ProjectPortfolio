import React from 'react';
import Header from './Header';
import Info from './Info';
import Projects from './Projects';
import Contact from './Contact';
import SkillSection from './Skills'
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Background Animation */}
      <div className="background-wrapper">
        <div className="gradient gradient-1"></div>
        <div className="gradient gradient-2"></div>
        <div className="gradient gradient-3"></div>
      </div>

      {/* Main Content */}
      <Header />
      <Info />
      <Projects />
      <Contact />
      <SkillSection />
      <Footer />
    </div>
  );
}

export default App;