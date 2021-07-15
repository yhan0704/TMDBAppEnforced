import React from "react";
import { Route, Switch, Link, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import MyMovies from "./MyMovies";
import Profile from "./Profile";

function ProfileTap() {
  let { path, url } = useRouteMatch();
  return (
    <>
      <div className="profileNav">
        <Link className="btn btn-dark" to={`${url}/myProfile`}>
          Profile
        </Link>
        <br />
        <Link className="btn btn-dark" to={`${url}/myMovies`}>
          My Movies
        </Link>
      </div>
      <div className="profileFunction">
        <Switch>
          <Route path={`${path}/myProfile`} component={Profile} />
          <Route path={`${path}/myMovies`} component={MyMovies} />
        </Switch>
      </div>
    </>
  );
}

const mapStateProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateProps)(ProfileTap);
