import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../src/MainPage';
import Profiles from '../src/components/Profiles';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profiles" element={<Profiles />} />
      </Routes>
    </Router>
  );
};

export default App;
