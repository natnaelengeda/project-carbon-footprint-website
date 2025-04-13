

import
React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({
  children,
  serverUrl
}: {
  children: React.ReactNode;
  serverUrl: string;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(serverUrl, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      console.log("Connected to Socket.io");
      console.log("Socket Id", newSocket.id);

      const room = localStorage.getItem("room");

      console.log(room);

      if (room) {
        newSocket.emit("join-room", room);
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log("Disconnected From Socket.io");
    };

  }, []);

  return (
    <SocketContext.Provider
      value={socket}>
      {children}
    </SocketContext.Provider>
  );
}