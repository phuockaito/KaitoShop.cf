import { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// --Contexts
import { UserContextProvider } from 'contexts/UserContext';
// --Components
import Header from 'component/Header';
import Loading from "loading/index";
import Page from 'routesDom/index';
import Menu from 'component/Header/Menu/index';
import Footer from 'component/Footer/index';
// --CSS
import './App.css';
import 'aos/dist/aos.css';


export default function App() {
  const showPage = (Page) => {
    var result = null;
    if (Page.length > 0) {
      result = Page.map((Page, index) => (
        <Route
          key={index}
          exact={Page.exact}
          path={Page.path}
          render={props => <Page.main {...props} />}
        />
      ))
    }
    return result;
  };
  return (
    <Router>
      <UserContextProvider>
        <Header />
        <Menu />
        <div className="ground-container">
          <div className="main-container">
            <Suspense fallback={<Loading />}>
              <Switch>
                {showPage(Page)}
                <Redirect to="/" from="/" />
              </Switch>
              <Footer />
            </Suspense>
          </div>
        </div>
      </UserContextProvider>
    </Router>
  );
};
