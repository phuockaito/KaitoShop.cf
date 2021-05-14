import { Suspense, useContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
// -- Context
import { UserContext } from "contexts/UserContext";
// --Components
import Header from 'component/Header';
import Loading from "loading/index";
import Menu from 'component/Header/Menu/index';
import Footer from 'component/Footer/index';
import NotFount from 'routesDom/Page/NotFount/index';
//page
import pageUser from 'routesDom/index';
import pageAdmin from 'routesDom/Page/Admin/Page'
// --CSS
import './App.css';
import 'aos/dist/aos.css';

// socket
export default function App() {
  // create State
  const [openMenu, setOpenMenu] = useState(false);
  const state = useContext(UserContext);
  const isAdmin = useSelector(state => state.user.isAdmin);
  const [token,] = state.token;
  // function
  const showPageUser = page => {
    if (page.length > 0) {
      return (
        page.map((page, index) => (
          <Route
            key={index}
            exact={page.exact}
            path={page.path}
            component={page.main}
          />
        ))
      )
    }
  };
  const showPageAdmin = page => {
    if (page.length > 0) {
      return (
        page.map((page, index) => (
          < Route
            key={index}
            exact={page.exact}
            path={page.path}
            component={(isAdmin && token) ? page.main : NotFount}
          />
        ))
      )
    }
  };
  return (
    <Router>
      <Header setOpenMenu={setOpenMenu} />
      <Menu token={token} openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <div className="ground-container">
        <div className="main-container">
          <Suspense fallback={<Loading />}>
            <Switch>
              {/*  page user */}
              {showPageUser(pageUser)}
              {/*  page admin */}
              {(isAdmin && token) && showPageAdmin(pageAdmin)}
              <Route path="/*" component={NotFount} exact />
              <Redirect to="/" from="/" />
            </Switch>
            <Footer />
          </Suspense>
        </div>
      </div>
    </Router>
  );
};
