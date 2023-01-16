import React, { useEffect, useReducer, useContext } from 'react';
import { io } from 'socket.io-client';
import { getLoggedUser } from '../helpers/utils';
export const SocketContext = React.createContext();
const SocketReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SOCKET_INSTANCE':
            const socket = io(`${process.env.REACT_APP_SOCKET_URL}`, { transports: ['websocket'], query: { username: action.username } });
            return socket;
        default:
            return state;
    }
};

const SocketProvider = ({ children }) => {
    const user = getLoggedUser();
    let socket = null;
    if (user && user.username) {
        socket = io(`${process.env.REACT_APP_SOCKET_URL}`, { transports: ['websocket'], query: { username: user.username } });
    }
    const [socketIO, dispatch] = useReducer(SocketReducer, socket);
    return <SocketContext.Provider value={{ socketIO, dispatch }}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
