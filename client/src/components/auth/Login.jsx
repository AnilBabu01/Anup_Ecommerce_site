import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Loader from "../loader/Loader";
import { useAlert } from "react-alert";
import Metadata from "../metadata/Metadata";
import { login, clearErrors } from "../actions/authActions";
import "./Auth.css";
const Login = ({ location }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  console.log(isAuthenticated);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      console.log(user.token);
      const token = user.token;
      localStorage.setItem("token", token);

      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, alert]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title={"Login"} />

          <div className="row wrapper loginMoble">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submit}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    name="email"
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    name="password"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>

                <Link to="/password/forgot" className="float-right mb-4">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>

                <Link to="/register" className="float-right mt-3">
                  New User?
                </Link>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
