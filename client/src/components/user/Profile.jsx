import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Metadata from "../metadata/Metadata";
import Loader from "../loader/Loader";
import "./User.css";
const Profile = () => {
  const usevigate = useNavigate();
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  if (isAuthenticated === false) {
    usevigate("/login");
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title={"Profile"} />
          <h2 className="mt-5 ml-5" style={{ marginTop: "8rem" }}>
            My Profile
          </h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-5">
              <h4>Full Name</h4>
              <p>{user.name}</p>

              <h4>Email Address</h4>
              <p>{user.email}</p>

              <h4>Joined On</h4>
              <p>{String(user.createdAt).substring(0, 10)}</p>

              {user.role !== "admin" && (
                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                  My Orders
                </Link>
              )}

              <Link
                to="/password/update"
                className="btn btn-primary btn-block mt-3"
              >
                Change Password
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
