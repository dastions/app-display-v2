import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from './context';

import logo from './logo.svg';
import './App.css';
import { toaster } from 'evergreen-ui';



const REFRESH_INTERVAL = 3e2;


const App = (props) => {
  const [data, setData] = useState({ elements: []});
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    setInterval(() => {
      socket.emit('refresh');
    }, REFRESH_INTERVAL);

    socket.on('refresh', (data) => {
      setData(data);
    });
  }, [socket]);

  useEffect(() => {
    socket.io.on("error", (error) => {
      toaster.danger("Error de conexión", {
        id: 'socket-error',
        description: 'Server Socket App not connected'
      })
    });
  }, [socket]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
