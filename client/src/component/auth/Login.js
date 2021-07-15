import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { login, removeError } from "../../actions/auth";
import { Redirect } from "react-router-dom";

function Login({ login, isAuthenticated, authError, removeError }) {
  const [formData, setFromdata] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState(true);
  const { email, password } = formData;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
      removeError();
    }, 3000);

    // To clear or cancel a timer, you call the clearTimeout(); method,
    // passing in the timer object that you created into clearTimeout().

    return () => clearTimeout(timer);
  }, [formData, removeError]);

  const onChange = (e) =>
    setFromdata({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setAlert(true);
    login(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign Into Your Account
        </p>
        {alert &&
          authError &&
          authError.map((err) => <h1 key={err.msg}>{err.msg}</h1>)}
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            Email
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            Password
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>

          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
      </section>
    </Fragment>
  );
}

const mapStateProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  authError: state.auth.errors,
});

export default connect(mapStateProps, { login, removeError })(Login);
