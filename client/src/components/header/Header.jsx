import React, { Fragment } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Search from "../search/Search";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/authActions";
import logo from "../Images/logo.png";
import "./Header.css";
const Header = ({ history }) => {
  const dispatch = useDispatch();

  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
  return (
    <>
      <nav class="navbar  navbarwith row">
        <div class="col-12 col-md-3">
          <div class="navbar-brand">
            <img
              style={{ width: "200px", height: "50px" }}
              src={logo}
              alt="logo"
            />
          </div>
        </div>

        <div class="col-12 col-md-6 mt-2 mt-md-0">
          <Search history={history} />
        </div>

        <div class="col-12 col-md-3 mt-4 mt-md-0 text-center">
          {user && user.role === "user" && (
            <Link to="/cart" state={{ textDecoration: "none" }}>
              <span id="cart" class="ml-3">
                Cart
              </span>
              <span
                class="ml-1"
                id="cart_count"
                style={{ marginRight: "20px" }}
              >
                {cartItems.length}
              </span>
            </Link>
          )}
          {user && user.role === "admin" && (
            <span id="cart" class="ml-3">
              Admin
            </span>
          )}

          {isAuthenticated ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user && user.avatar}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}
                <Link className="dropdown-item" to="/orders/me">
                  Orders
                </Link>
                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <Link className="dropdown-item" to="/">
                  home
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
