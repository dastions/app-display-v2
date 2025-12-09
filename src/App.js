import React, { useContext, useState, useEffect } from 'react';
import { Route, Routes, NavLink } from "react-router-dom";

import { SocketContext } from './context';

import './App.css';
import { CogIcon, Pane } from "evergreen-ui";

import MainLogo from "./logo.png";
import QrApp from "./static/app.truckandscales.com.png";
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
    <Pane display="flex" minHeight="100vh" minWidth="100vw">
      <Pane flex={1} display="flex" flexDirection="column" className='App-header'>
        <Pane>
          <Pane display="flex" position="absolute" top={45} left={0} paddingTop={60} paddingLeft={70}>
            <NavLink
              key={'main-nav'}
              to={''}
            >
              <img
                src={MainLogo}
                alt=""
                height={100}
                className="main-logo"
              />
            </NavLink>
          </Pane>
          {/* <Pane position="absolute" margin="auto" right={60} top={80} paddingRight={60}>
            <NavLink
              key={'config-nav'}
              to={'config'}
            >
              <CogIcon color='gray700' size={20}></CogIcon>
            </NavLink>
          </Pane> */}
        </Pane>
        <Routes>
          <Route
            exact
            path="/"
            element={ <Display data={data} /> }
          />
          {/* <Route
            path="config"
            element={ <Pane /> }
          /> */}
        </Routes>
      </Pane>
    </Pane>
  );
}

export default App;
