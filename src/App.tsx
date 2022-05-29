import './App.scss';

import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect } from 'react';

import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Content from './components/Content/Content';
import Dashboard from './components/Dashboard/Dashboard';
import Bills from './components/Bills/Bills';
import { apiClient } from './utils/apiClient';
import { ApiMethods } from './types';
import LoginScreen from './components/LoginScreen/LoginScreen';

const App = () => {
  let location = useLocation();

  useEffect(() => {
    const fetchApi = async () => {
      apiClient("http://localhost:3000/api/bills", ApiMethods.GET).then((data) => console.log(data))
    }

    fetchApi();
  }, [])

  return (
      <div className="App">
        <Header />
        <div className="content">
        <Routes>
          <Route index element={<LoginScreen />} /> 
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/bills' element={<Bills />} /> 
        </Routes>
        </div>
      </div>
  );
}

export default App;
