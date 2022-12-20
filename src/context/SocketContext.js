import React, { createContext, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import { toaster } from 'evergreen-ui';

const SocketContext = createContext({ socket: null });

const socketUrl = process.env.SOCKET_URL || 'http://127.0.0.1:3001';

console.log(`SOCKET_URL: ${process.env.SOCKET_URL}`);
console.log(`Socket: ${socketUrl}`);

const SocketProvider = ({ children }) => {
  const socket = socketIOClient(socketUrl);

  useEffect(() => {
    socket.io.on("error", (error) => {
      toaster.danger("Error de conexión", {
        id: 'socket-error',
        description: 'Server Socket App not connected'
      })
    });
  }, [socket]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketProvider };
