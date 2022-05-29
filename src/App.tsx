import './App.scss';

import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect } from 'react';

import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Content from './components/Content/Content';
import Dashboard from './components/Dashboard/Dashboard';
import Bills from './components/Bills/Bills';

const App = () => {
  let location = useLocation();

  useEffect(() => {
    const fetchApi = async () => {
      fetch("http://localhost:3001/api").then((res) => res.json()).then((data) => console.log(data))
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
