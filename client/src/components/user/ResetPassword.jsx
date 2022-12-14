import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../metadata/Metadata";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../actions/authActions";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    dispatch(forgotPassword(email));
  };

  return (
    <Fragment>
      <MetaData title={"Forgot Password"} />
      {message ? (
        <>
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <h2> please check your mail inbox</h2>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row wrapper loginMoble">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Forgot Password</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Enter Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  id="forgot_password_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Send Email
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
