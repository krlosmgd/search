import React from 'react';
import Home from './components/pages/home/Home';
import Results from './components/pages/results/Results';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/results/:search" element={<Results/>} />
      </Routes>
    </Router>
  );
}

export default App;
