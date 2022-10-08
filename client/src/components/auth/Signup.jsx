import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../metadata/Metadata";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { register, clearErrors } from "../actions/authActions";
import Loader from "../loader/Loader";

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

  const submitHandler = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("avatar", avatar, avatar.name);
    formdata.append("name", name);
    formdata.append("email", email);

    formdata.append("password", password);

    dispatch(register(formdata));
    navigate("/login");
    console.log("form data ", formdata);
  };
  const onChange = (e) => {
    if (e.target.name === "avatar") {
      setAvatar(e.target.files[0]);
      setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      {loading ? (
        Loader
      ) : (
        <>
          <Metadata title={"Register"} />

          <div className="row wrapper">
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

                <div className="form-group">
                  <label htmlfor="avatar_upload">Avatar</label>
                  <div className="d-flex align-items-center">
                    <div>
                      <figure className="avatar mr-3 item-rtl">
                        <img
                          src={avatarPreview}
                          className="rounded-circle"
                          alt="imag"
                        />
                      </figure>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        name="avatar"
                        className="custom-file-input"
                        id="customFile"
                        accept="images/*"
                        onChange={onChange}
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose Avatar
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  id="register_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
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
