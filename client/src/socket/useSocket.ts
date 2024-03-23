import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

let socketInstance: Socket | null = null;

const useSocket = () => {
  const [socket, setSocket] = useState(socketInstance);

  useEffect(() => {
    if (!socketInstance) {
      socketInstance = io("http://localhost:3000");

      socketInstance.on("connected", ({ message }) => console.log(message));
      setSocket(socketInstance);

      return () => {
        socketInstance?.close();
        socketInstance = null;
      };
    }
    return;
  }, []);

  return socket as Socket;
};

export default useSocket;