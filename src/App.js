import React, { useContext, useState, useEffect } from 'react';
import { Route, Routes, NavLink, useLocation } from "react-router-dom";

import { SocketContext } from './context';

import './App.css';
import { CogIcon, Pane } from "evergreen-ui";

import MainLogo from "./logo.png";
import QrApp from "./static/app.truckandscales.com.png";
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
        <Pane>
          <Pane display="flex" position="absolute" top={40} left={40} paddingTop={60} paddingLeft={70}>
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
          <Pane position="absolute" margin="auto" right={60} top={80} paddingRight={60}>
            <NavLink
              key={'config-nav'}
              to={'config'}
            >
              <CogIcon color='gray700' size={20}></CogIcon>
            </NavLink>
          </Pane>
          <Pane display="flex" position="absolute" bottom={40} right={40} >
            <img
              src={QrApp}
              alt=""
              height={120}
            />
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
