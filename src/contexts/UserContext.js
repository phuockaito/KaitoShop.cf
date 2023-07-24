import { createContext, useState, useEffect, useLayoutEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import { io } from "socket.io-client";

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
    const [view, setView] = useState(null);
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
                if (msg) {
                    if (_id_user == idUser) {
                        console.log(accountDelete);
                        setToken(null);
                        setUser(null);
                        setIdUser(null);
                        localStorage.removeItem("token");
                        notification["error"]({
                            message: "Thông báo",
                            description: "Tài khoản này đã bị xóa",
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
                const { accountOnline, view } = msg;
                if (msg) setView(view);
                setCountUserOnline(accountOnline);
            });
            return () => socket.off("severCountUserOnline");
        }
    }, [socket]);
    // connect and get user if have token
    useLayoutEffect(() => {
        (async () => {
            const socketIo = io("https://api-kaito-shop.vercel.app", {
                credentials: true,
                allowRequest: (req, callback) => {
                    const noOriginHeader = req.headers.origin === undefined;
                    callback(null, noOriginHeader); // only allow requests without 'origin' header
                },
                path: '/socket.io',
                secure: true,
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
                    console.log(e);
                    localStorage.removeItem("token");
                    window.location.reload();
                }
            }
            return () => socket.close();
        })();
    }, []);
    const state = {
        patchCart: [patchCart, setPatchCart],
        token: [token, setToken],
        user: [user, setUser],
        idUser: [idUser, setIdUser],
        socket,
        UserOnline: [countUserOnline],
        view: [view],
    };
    return (
        <UserContext.Provider value={state}>{children}</UserContext.Provider>
    );
};
export { UserContext, UserContextProvider };
