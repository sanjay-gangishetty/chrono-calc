// src/App.js
import './App.css';
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Header from './Components/Header';
import Footer from './Components/Footer';
import DateCalculator from './Components/DateCalculator';
import PreviousCalculations from './Components/PreviousCalculations';

function App() {
  const fadeAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 800 }
  });

  const [updateCalculations, setUpdateCalculations] = useState(false);

  const handleNewCalculation = () => {
    // Toggle the state to trigger a refresh in PreviousCalculations component
    setUpdateCalculations(!updateCalculations);
  };

  return (
    <animated.div style={fadeAnimation} className="app-container">
      <Header />
      <div className="content">
        <DateCalculator onNewCalculation={handleNewCalculation} />
        <PreviousCalculations key={updateCalculations} />
      </div>
      <Footer />
    </animated.div>
  );
}

export default App;
