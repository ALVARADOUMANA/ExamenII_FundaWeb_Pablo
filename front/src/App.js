import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import HomePage from './pages/HomePage';  
import TablaEmpleados from './pages/TablaEmpleados';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <MyNavbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/tabla_empleados" element={<TablaEmpleados />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;