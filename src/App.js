import React, { useContext, useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";

import { SocketContext } from './context';

import './App.css';

import Display from './routes/Display';

const REFRESH_INTERVAL = 200; 

const App = (props) => {
  
  const [data, setData] = useState({ });
  const { socket, socketError } = useContext(SocketContext);

  
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
      {/* Contenedor central - Display */}
      <div style={{ width: '100%', height: '100%' }}>
        <Routes>
          <Route
            exact
            path="/"
            element={ <Display data={data} socketError={socketError} /> }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
