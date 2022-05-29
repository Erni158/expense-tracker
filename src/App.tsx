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
          <Menu />
          <Content>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/bills' element={<Bills />} />
            </Routes>
          </Content>
        </div>
      </div>
  );
}

export default App;
