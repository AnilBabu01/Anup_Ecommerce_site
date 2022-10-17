import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../metadata/Metadata";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { register, clearErrors } from "../actions/authActions";
import Loader from "../loader/Loader";
import axios from "axios";
const Signup = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("name", name);
    formdata.append("email", email);

    formdata.append("password", password);
    if (email && name && password) {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post(
        `${process.env.REACT_APP_URL}/api/auth/regster`,
        { name: name, email: email, password: password }
      );

      if (res) {
        dispatch(register(formdata));
        navigate("/login");
        console.log("form data ", formdata);
        alert.success("You have Registerwd Successfully");
      } else {
        alert.success("You have Registerwd Successfully");
      }

      console.log(res);
    }
  };
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      {loading ? (
        Loader
      ) : (
        <>
          <Metadata title={"Register"} />

          <div className="row wrapper loginMoble">
            <div className="col-10 col-lg-5">
              <form
                onSubmit={submitHandler}
                className="shadow-lg"
                encType="multipart/form-data"
              >
                <h1 className="mb-3">Register</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    value={name}
                    name="name"
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    name="email"
                    onChange={onChange}
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
                    onChange={onChange}
                  />
                </div>

                <button
                  id="register_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={email && password && email ? false : true}
                >
                  REGISTER
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Signup;
