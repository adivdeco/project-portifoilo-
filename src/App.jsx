import React from 'react';
import LenisScroll from './components/Layout/LenisScroll';
import MagneticCursor from './components/Cursor/MagneticCursor';
import Hero from './components/Hero/Hero';
import MagneticDock from './components/Navigation/MagneticDock';
import ProjectList from './components/Projects/ProjectList';
import TechStack from './components/TechStack/TechStack';
import Contact from './components/Contact/Contact';
import './App.css'; // Minimal global layout stuff

function App() {
  return (
    <LenisScroll>
      <MagneticCursor />
      
      <main className="app-container">
        <Hero />
        <ProjectList />
        <TechStack />
        <Contact />
      </main>

      <MagneticDock />
    </LenisScroll>
  );
}

export default App;
