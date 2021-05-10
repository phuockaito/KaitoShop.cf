import { createContext, useState, useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { notification } from 'antd';
import io from "socket.io-client";
// dispatch API
import { getProfile } from "features/User/patchAPI";
const UserContext = createContext(null);
const tokenLocal = localStorage.getItem("token");
const UserContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [patchCart, setPatchCart] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [countUserOnline, setCountUserOnline] = useState(null);
  // Join room
  useEffect(() => {
    if (socket) {
      socket.emit("countUserOnline", 8080);
    }
  }, [socket]);

  // remove user if user account delete because admin
  useEffect(() => {
    if (socket) {
      socket.on("serverDeleteAccount", (msg) => {
        const { accountDelete, _id_user } = msg;
        console.log(msg)
        if (msg) {
          if (_id_user == idUser) {
            console.log(accountDelete)
            setToken(null);
            setUser(null);
            setIdUser(null)
            localStorage.removeItem("token");
            notification['error']({
              message: 'Thông báo',
              description:
                'Tài khoản này đã bị xóa',
            });
          }
        }
      });
      return () => socket.off("serverDeleteAccount");
    }
  }, [socket, idUser]);
  // sum account online
  useEffect(() => {
    if (socket) {
      socket.on("severCountUserOnline", (msg) => {
        setCountUserOnline(msg)
      });
      return () => socket.off("severCountUserOnline");
    }
  }, [socket]);
  // connect and get user if have token
  useEffect(async () => {
    const socketIo = io("", {
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
          setIdUser(currentUser.user._id);
        }
      } catch (e) {
        console.log(e)
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
    socket,
    UserOnline: [countUserOnline]
  };
  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
export { UserContext, UserContextProvider };
