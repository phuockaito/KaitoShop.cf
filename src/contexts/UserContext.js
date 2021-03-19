import { createContext, useState, useEffect } from "react";
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client'
// dispatch API
import { getProfile } from 'features/User/patchAPI';
const UserContext = createContext(null);
const tokenLocal = localStorage.getItem('token');
const UserContextProvider = (props) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        token: null,
        dataUser: [],
        socket: null,
    });
    useEffect(async () => {
        const socket = io('https://api-shop-phuoc.herokuapp.com', {
            withCredentials: true,
            extraHeaders: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Header": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                "Access-Control-Allow-Methods": "PUT, POST, PUT, DELETE, GET"
            }
        });
        if (tokenLocal) {
            const actionResult = await dispatch(getProfile());
            const currentUser = unwrapResult(actionResult);
            setState({
                token: tokenLocal,
                dataUser: currentUser.data,
                socket: socket
            })
        } else {
            setState({
                token: null,
                dataUser: [],
                socket: socket
            })
        }
        return () => socket.close();
    }, []);
    return (
        <UserContext.Provider value={[state, setState]}>
            {props.children}
        </UserContext.Provider>
    )
};
export { UserContext, UserContextProvider };
