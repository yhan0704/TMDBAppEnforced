import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { editUser, removeError } from "../../actions/auth";

const initialState = {
  email: "",
  name: "",
};

function Profile({
  user,
  editUser,
  isAuthenticated,
  successMsg,
  authError,
  removeError,
  history,
}) {
  const [formData, setFormData] = useState({ initialState });
  const [alert, setAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
      removeError();
    }, 3000);

    // To clear or cancel a timer, you call the clearTimeout(); method,
    // passing in the timer object that you created into clearTimeout().

    return () => clearTimeout(timer);
  }, [formData, removeError]);

  useEffect(() => {
    if (user) {
      const userData = { ...initialState };
      for (const key in user) {
        if (key in userData) userData[key] = user[key];
      }
      setFormData(userData);
    }
  }, [user]);

  const { email, name } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setAlert(true);
    editUser(formData);
  };

  return (
    <section className="container">
      {isAuthenticated && user && (
        <div>
          <h1 className="large text-primary">Edit Accont</h1>
          <div>
            {alert &&
              authError &&
              authError.map((err) => <h1 key={err.msg}>{err.msg}</h1>)}
            {alert && successMsg && <h1>{successMsg}</h1>}
            <form className="form" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                Email
                <input
                  type="email"
                  name="email"
                  value={email || ""}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                Name
                <input
                  type="text"
                  name="name"
                  value={name || ""}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <input type="submit" className="btn btn-primary" value="Edit" />
              <div onClick={() => history.goBack()} className="btn btn-primary">
                Back
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
const mapStateProps = (state) => ({
  successMsg: state.auth.msg,
  authError: state.auth.errors,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateProps, { editUser, removeError })(Profile);
