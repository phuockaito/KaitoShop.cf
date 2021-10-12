import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store';

import App from './App';
import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
// --Contexts
import { UserContextProvider } from 'contexts/UserContext';
// console.log("%cDừng lại!", "color: red;font-size:60px;");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


