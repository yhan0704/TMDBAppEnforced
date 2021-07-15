import React, { Fragment, useEffect } from "react";
import "./App.css";
import Landing from "./component/layout/Landing";
import Navbar from "./component/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./component/auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import Register from "./component/auth/Register";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import ProfileTap from "./component/profile/ProfileTap";
import NotFound from "./component/layout/NotFound";
import DetailPage from "./component/layout/DetailPage";
import Romance from "./component/layout/genres/Romance";
import Action from "./component/layout/genres/Action";
import Mystery from "./component/layout/genres/Mystery";
import Horror from "./component/layout/genres/Horror";
import Comedy from "./component/layout/genres/Comedy";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/profile" component={ProfileTap} />
            <Route path="/movie/:id" component={DetailPage} />
            <Route path="/romance" component={Romance} />
            <Route path="/action" component={Action} />
            <Route path="/mystery" component={Mystery} />
            <Route path="/horror" component={Horror} />
            <Route path="/comedy" component={Comedy} />
            <Route component={NotFound}></Route>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
