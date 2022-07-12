import React from 'react';
import './App.css';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={Auth(LandingPage, null)} />
        <Route path="/login" element={Auth(LoginPage, false)} />
        <Route path="/register" element={Auth(RegisterPage,false)}/>
      </Routes>
    </Router>
  );
}





export default App;
