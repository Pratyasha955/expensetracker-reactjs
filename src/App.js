import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Auth/signup';
import { AuthProvider } from './Store/AuthContext';
import Login from './Auth/login';
import './App.css';
import Header from './Layout/Header';
import Home from './pages/welcome';
import ProfileForm from './pages/ProfileForm';
import ForgotPassword from './Auth/forgot';
import { ExpenseProvider } from './Store/ExpenseContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ExpenseProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/Welcome' element={<Home />} />
          <Route path='/complete-profile' element={<ProfileForm />} />
        </Routes>
        </ExpenseProvider>
      </AuthProvider>
    </Router>

  );
}

export default App;
