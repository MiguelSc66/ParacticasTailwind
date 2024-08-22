import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Payment from './components/payment';
import Accordion from './components/accordion';
import AgeCalculator from './components/ageCalculator';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Payment />} />
        <Route path="/test1" element={<Accordion />} />
        <Route path="/test2" element={<AgeCalculator />}/>
      </Routes>
    </Router>
  );
}

export default App;

