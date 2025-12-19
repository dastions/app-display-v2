import React, { useContext } from 'react';
import { Route, Routes } from "react-router-dom";

import { SocketContext } from './context';

import './App.css';

import Display from './routes/Display';

const App = (props) => {
  const { data } = useContext(SocketContext);

  return (
    <div className="app-container">
      {/* Contenedor central - Display */}
      <div style={{ width: '100%', height: '100%' }}>
        <Routes>
          <Route
            exact
            path="/"
            element={ <Display data={data} /> }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
