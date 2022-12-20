import React, { useContext, useState, useEffect } from 'react';
import { Route, Routes, NavLink, useLocation } from "react-router-dom";

import { SocketContext } from './context';

import './App.css';
import { CogIcon, Pane } from "evergreen-ui";

import MainLogo from "./logo.png";
import Display from './routes/Display';

const REFRESH_INTERVAL = 3e2;


const App = (props) => {
  
  const [data, setData] = useState({ });
  const { socket } = useContext(SocketContext);
  const location = useLocation();

  
  useEffect(() => {
    setInterval(() => {
      socket.emit('refresh');
    }, REFRESH_INTERVAL);

    socket.on('refresh', (data) => {
      setData(data);
    });
  }, [socket]);

  return (
    <Pane display="flex" minHeight="100vh" minWidth="100vw">
      <Pane flex={1} display="flex" flexDirection="column" className='App-header'>
        <Pane display="flex" marginTop={16} marginBottom={16} minHeight="11vh" alignContent="center" flexDirection="row">
          <Pane display="flex" margin="20px">
            <NavLink
              key={'main-nav'}
              to={''}
            >
              <img
                src={MainLogo}
                alt=""
                height={80}
              />
            </NavLink>
          </Pane>
          <Pane position="absolute" margin="auto" right={40} top={40}>
          <NavLink
            key={'config-nav'}
            to={'config'}
          >
            <CogIcon color='gray700'></CogIcon>
          </NavLink>
          </Pane>
        </Pane>
        <Routes>
          <Route
            exact
            path="/"
            element={ <Display data={data} /> }
          />
          <Route
            path="config"
            element={ <Pane /> }
          />
        </Routes>
      </Pane>
    </Pane>
  );
}

export default App;
