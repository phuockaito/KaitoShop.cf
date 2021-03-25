import { createContext, useState, useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
// dispatch API
import { getProfile } from "features/User/patchAPI";
const UserContext = createContext(null);
const tokenLocal = localStorage.getItem("token");
const UserContextProvider = (props) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState([]);
  const [socket, setSocket] = useState(null);
  const [patchCart, setPatchCart] = useState(null);
  useEffect(async () => {
    const socketIo = io("http://localhost:3001", {
      withCredentials: true,
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Header":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        "Access-Control-Allow-Methods": "PUT, POST, PUT, DELETE, GET",
      },
    });
    console.log({ socketIo });
    if (socketIo) {
      setSocket(socketIo);
    }
    if (tokenLocal) {
      const actionResult = await dispatch(getProfile());
      const currentUser = unwrapResult(actionResult);
      setUser(currentUser.data);
      setToken(tokenLocal);
    }
    return () => socket.close();
  }, []);
  const state = {
    patchCart: [patchCart, setPatchCart],
    token: [token, setToken],
    user: [user, setUser],
    socket,
  };
  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};
export { UserContext, UserContextProvider };
