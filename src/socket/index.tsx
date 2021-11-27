import React, { useState, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const BACKEND_URL = "https://battle-composers-backend.raymondji.repl.co";

interface SocketService {
  socket: Socket;
  roomId: string;
  clients: string[];
  setRoomId: (roomId: string) => void;
}

const SocketContext = React.createContext<SocketService | undefined>(undefined);

type SocketProviderProps = {children: React.ReactNode};

export function SocketProvider({children}: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [roomId, setRoomId] = useState<string | undefined>(undefined);
  const [clients, setClients] = useState<string[]>([]);

  useEffect(() => {
    console.log("roomId", roomId);
    if (!roomId) {
      return;
    }

    const socket = io(BACKEND_URL);
    socket.on("connect", () => {
      console.log("connected, id:", socket.id);

      socket.emit('join-room', roomId);
    });
    socket.on('joined-room', () => {
      console.log("joined room");
    });
    socket.on('in-room', (args) => {
      console.log("in room", args);
      setClients(args);
    });
    setSocket(socket);

    return () => {
      socket.disconnect();
      setSocket(undefined);
    }
  }, [roomId]);

  return (
    <SocketContext.Provider value={{socket, clients, roomId, setRoomId}}>
      {children}
    </SocketContext.Provider>
  );
};

export function useSocket() {
  const context = React.useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within SocketContext.Provider");
  }
  return context;
};
