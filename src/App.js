import React from 'react';
import{BrowserRouter as Router,Route,Routes}from'react-router-dom';
import Signup from './Auth/signup';
import { AuthProvider } from './Store/AuthContext';
import Login from './Auth/login';
import './App.css';
import Home from './pages/welcome';
import ProfileForm from './pages/ProfileForm';

function App() {
  return (
   <Router>
    <AuthProvider>
    <Routes>
     <Route path='/' element={<Login />} />
     <Route path='/Signup' element={<Signup />} />
     <Route path='/Welcome' element={<Home />} />
     <Route  path='/complete-profile' element={<ProfileForm />}/>
    </Routes>
    </AuthProvider>
    </Router>
    
  );
}

export default App;
