import { useContext, createContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider(props) {
    let socket = io();
    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    );
}
