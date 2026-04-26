import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Header from './Header';
import Info from './Info';
import Projects from './Projects';
import SkillSection from './Skills';
import Contact from './Contact';
import Footer from './Footer';
import Admin from './Admin';
import './App.css';

function Portfolio() {
  return (
    <div className="App">
      <Header />
      <Info />
      <Projects />
      <SkillSection />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  return (
    <BrowserRouter basename="/ProjectPortfolio">
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Admin user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;