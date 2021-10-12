import { useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
// dispatch AP
import { postActiveEmail } from "features/User/patchAPI";
// context
import { UserContext } from "contexts/UserContext";
// component
import LoadingPage from 'loading/index';
const tokenLocal = localStorage.getItem("token");
export default function ActiveEmail() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { accessToken } = useParams();
  const state = useContext(UserContext);
  // create
  const [token, setToken] = state.token;
  const [, setUser] = state.user;
  const [, setIdUser] = state.idUser;
  const [patchCart,] = state.patchCart;
  const loading = useSelector(state => state.user.loadingSlice);
  //useEffect
  useEffect(async () => {
    if (token && patchCart) {
      history.push(patchCart);
    }
    else if (tokenLocal || token) {
      history.push("/");
    }
    if (accessToken) {
      const actionResult = await dispatch(postActiveEmail({ accessToken: accessToken }));
      const currentUser = unwrapResult(actionResult);
      if (currentUser) {
        setToken(currentUser.token);
        setUser(currentUser.user);
        setIdUser(currentUser.user._id);
      };
    };
  }, [accessToken, token]);
  return (
    <>
      {loading && <LoadingPage />}
    </>
  )
}

