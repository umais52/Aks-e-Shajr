import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Methodology from './pages/Methodology';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"             element={<Dashboard />} />
        <Route path="/methodology"  element={<Methodology />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
