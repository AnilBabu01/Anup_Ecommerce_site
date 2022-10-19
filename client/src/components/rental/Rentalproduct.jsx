import React from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
const Rentalproduct = ({ product, deleted, getproduct }) => {
  const alert = useAlert();
  const deleterental = async (id) => {
    axios.defaults.headers.delete[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    const data = await axios.delete(
      `${process.env.REACT_APP_URL}/api/rental/userdelete/${id}`
    );
    if (data.data.status === true) {
      getproduct();
      alert.success(data.data.msg);
    }
  };

  return (
    <>
      <div
        className="col-sm-12 col-md-6 col-lg-2"
        style={{ marginBottom: "1rem" }}
      >
        <div className="card p-2 rounded">
          <img
            alt="img"
            className="proimg"
            src={product.image ? product.image : ""}
          />

          <div className="card-body d-flex flex-column">
            <h5 className="card-title">
              <Link to={`/product/${product._id}`}>
                {product && product.productname}
              </Link>
            </h5>

            <p className="card-text">₹{product && product.price}</p>
            <p className="card-text">status : {product && product.status}</p>
            {deleted ? (
              <>
                {" "}
                <button
                  onClick={() => deleterental(product._id)}
                  id="view_btn"
                  className="btn btn-block"
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                {" "}
                <Link
                  to={`/rentaldetails/${product._id}`}
                  id="view_btn"
                  className="btn btn-block"
                >
                  View Details
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Rentalproduct;
