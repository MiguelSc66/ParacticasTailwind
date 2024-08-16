import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Payment from './components/payment';
import Accordion from './components/accordion';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Payment />} />
        <Route path="/test1" element={<Accordion />} />
      </Routes>
    </Router>
  );
}

export default App;

