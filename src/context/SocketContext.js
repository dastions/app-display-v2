import React, { createContext, useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const SocketContext = createContext({ socket: null, socketError: false });

const socketUrl = process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000'

const SocketProvider = ({ children }) => {
  const socket = socketIOClient(socketUrl);
  const [error, setError] = useState(false);

  useEffect(() => {
    socket.io.on("error", () => {
      setError(true);
    });
    
    socket.on("connect", () => {
      setError(false);
    });
  }, [socket]);

  return <SocketContext.Provider value={{ socket, socketError: error }}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketProvider };
