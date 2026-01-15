// import logo from './logo.svg';
// import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import SignIn from './UI/screens/signIn';
import Signup from './UI/screens/signUp';
import MainPage from '../src/UI/screens/MainPage';
import Dashbaord from '../src/UI/screens/Dashbaord';
import Resetpassword from '../src/UI/screens/FormPasswordReset';

// App.js
const App = () => {
  return (
  
    <Router>

      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUP" element={<Signup />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/DashbaordPage" element={<Dashbaord />} />
        <Route path="/ResetPassword" element={<Resetpassword />} />
      </Routes>

    </Router>
  
  );
};

export default App;


