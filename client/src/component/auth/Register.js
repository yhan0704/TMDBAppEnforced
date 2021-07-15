import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import { connect } from "react-redux";

function Register({ register, authError, isAuthenticated }) {
  const [formData, setFromdata] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFromdata({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Please check your passwords match");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        {authError && authError.map((err) => <h1>{err.msg}</h1>)}
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            Name
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
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
          <div className="form-group">
            Check Password
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="login">Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
}

const mapStateProps = (state) => ({
  authError: state.auth.errors,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateProps, { register })(Register);
