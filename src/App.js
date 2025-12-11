import React, { useContext, useState, useEffect } from 'react';
import { Route, Routes, NavLink } from "react-router-dom";

import { SocketContext } from './context';

import './App.css';

import MainLogo from "./logo.png";
import Display from './routes/Display';

const REFRESH_INTERVAL = 200; // 3e2 200 milisegundos

const App = (props) => {
  
  const [data, setData] = useState({ });
  const { socket } = useContext(SocketContext);

  
  useEffect(() => {
    setInterval(() => {
      socket.emit('refresh');
    }, REFRESH_INTERVAL);

    socket.on('refresh', (data) => {
      console.log('Data recibida:', data);
      setData(data);
    });
  }, [socket]);

  return (
    <div className="app-container">
      {/* Contenedor izquierdo - Main Logo */}
      <div className="logo-container">
        <NavLink
          key={'main-nav'}
          to={''}
        >
          <img
            src={MainLogo}
            alt=""
            className="main-logo"
          />
        </NavLink>
      </div>

      {/* Contenedor central - Display */}
      <div className="display-container App-header">
        <Routes>
          <Route
            exact
            path="/"
            element={ <Display data={data} /> }
          />
        </Routes>
      </div>

      {/* Contenedor derecho - Vacío */}
      <div className="empty-container">
      </div>
    </div>
  );
}

export default App;
