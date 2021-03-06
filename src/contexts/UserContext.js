import { createContext, useState, useEffect } from "react";
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// dispatch API
import { getProfile } from 'features/User/patchAPI';
const UserContext = createContext(null);
const tokenLocal = localStorage.getItem('token');
const UserContextProvider = (props) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        token: null,
        dataUser: [],
    });
    useEffect(async () => {
        if (tokenLocal) {
            const actionResult = await dispatch(getProfile());
            const currentUser = unwrapResult(actionResult);
            setUser({
                token: tokenLocal,
                dataUser: currentUser.data
            })
        }
    }, []);
    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
};
export { UserContext, UserContextProvider };
