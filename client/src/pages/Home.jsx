import React from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import About from '../components/About';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Contact from '../components/Contact';
import ShaderBackground from '../components/ShaderBackground';

const Home = () => {
  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <ShaderBackground speed={0.5} height="220px" />
      <Projects />
      <ShaderBackground speed={0.8} height="220px" />
      <Services />
      <ShaderBackground speed={0.6} height="220px" />
      <Contact />
    </main>
  );
};

export default Home;
