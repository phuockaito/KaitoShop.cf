import { createContext, useState, useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
// dispatch API
import { getProfile } from "features/User/patchAPI";
const UserContext = createContext(null);
const tokenLocal = localStorage.getItem("token");
const UserContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const admin = useSelector(state => state.user.isAdmin);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState([]);
  const [socket, setSocket] = useState(null);
  const [patchCart, setPatchCart] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(admin);
  const [countUserOnline, setCountUserOnline] = useState(null);
  // Join room
  useEffect(() => {
    if (socket) {
      socket.emit("countUserOnline", 8080);
    }
  }, [socket]);
  useEffect(() => {
    if (socket) {
      socket.on("severCountUserOnline", (msg) => {
        setCountUserOnline(msg)
      });
      return () => socket.off("severCountUserOnline");
    }
  }, [socket]);
  useEffect(async () => {
    const socketIo = io("https://api-kaito-shop.herokuapp.com", {
      withCredentials: true,
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Header":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        "Access-Control-Allow-Methods": "PUT, POST, PUT, DELETE, GET",
      },
    });
    if (socketIo) {
      setSocket(socketIo);
    }
    if (tokenLocal) {
      try {
        const actionResult = await dispatch(getProfile());
        const currentUser = unwrapResult(actionResult);
        if (currentUser) {
          setUser(currentUser.user);
          setToken(tokenLocal);
          setIdUser(currentUser.user[0]._id);
        }
      } catch (e) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
    return () => socket.close();
  }, []);
  const state = {
    patchCart: [patchCart, setPatchCart],
    token: [token, setToken],
    user: [user, setUser],
    idUser: [idUser, setIdUser],
    admin: [isAdmin, setIsAdmin],
    socket,
    UserOnline: [countUserOnline]
  };
  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
export { UserContext, UserContextProvider };
