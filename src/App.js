// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Navigate,Route, Routes } from 'react-router-dom';

import Authorisation from './pages/Authorisation';
import HomePage from './pages/HomePage';
import Registration from './pages/Registration';

const App = () => {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
});
  const handleValueChange = (value) => {
    setUserData(value);
    // console.log(value.username);
 };



    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Authorisation onValueChange={handleValueChange} />} />
                <Route path="/register" element={<Registration onValueChange={handleValueChange} />} />
                <Route
                    path="/home"
                    element={userData ? <HomePage userData={userData} /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;
