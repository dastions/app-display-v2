import React, { createContext, useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const SocketContext = createContext({ socket: null, data: {} });

const socketUrl = process.env.SOCKET_URL || 'http://192.168.1.7:4000';
const REFRESH_INTERVAL = 200;

const SocketProvider = ({ children }) => {
  const socket = socketIOClient(socketUrl);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!socket.connected) {
      setError('Error de conexión');
    }

    const handleConnect = () => {
      setError(null);
    };

    const handleConnectError = () => {
      setError('Error de conexión');
    };

    socket.on('connect', handleConnect);
    socket.io.on('error', handleConnectError);

    return () => {
      socket.off('connect', handleConnect);
      socket.io.off('error', handleConnectError);
    };
  }, [socket]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      socket.emit('refresh');
    }, REFRESH_INTERVAL);

    socket.on('refresh', (receivedData) => {
      console.log('Data recibida:', receivedData);
      setData(receivedData);
    });

    return () => {
      clearInterval(intervalId);
      socket.off('refresh');
    };
  }, [socket]);

  return <SocketContext.Provider value={{ socket, data, SocketError: error }}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketProvider };
