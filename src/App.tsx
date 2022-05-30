import './App.scss';

import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect } from 'react';

import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Bills from './components/Bills/Bills';
import { apiClient } from './utils/apiClient';
import { ApiMethods } from './types';
import LoginScreen from './components/LoginScreen/LoginScreen';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { API_TOKEN_CHECK } from './apiRoutes';

const App = () => {
  useEffect(() => {
    const checkTokenValidation = async () => {
      if (localStorage.getItem("loginToken")) {
        apiClient(`http://localhost:3000${API_TOKEN_CHECK}`, ApiMethods.GET).then((data) => console.log(data))
      }
    }

    checkTokenValidation();
  }, [])

  return (
      <div className="App">
        <Header />
        <div className="content">
        <Routes>
          <Route index element={<LoginScreen />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
                <Dashboard /> 
            </ProtectedRoute>
            } 
          />
          <Route path="/bills" element={
            <ProtectedRoute>
                <Bills /> 
            </ProtectedRoute>
            } 
          />
        </Routes>
        </div>
      </div>
  );
}

export default App;
