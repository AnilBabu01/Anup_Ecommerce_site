import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../loader/Loader";
import Metadata from "../metadata/Metadata";
import { addItemToCartrental } from "../actions/cartActions";

const RentalDetails = () => {
  const dispatch = useDispatch();
  const [product, setproduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const alert = useAlert();
  const { id } = useParams();

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  console.log(cartItems);

  const getproduct = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/rental/getsinglerental/${id}`
    );

    console.log("from rental", data.product);
    setproduct(data.product);
  };

  useEffect(() => {
    getproduct();
  }, []);

  const addToCart = () => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(addItemToCartrental(id, quantity));
      alert.success("Item Added to Cart");
    }
  };

  return (
    <div>
      <Metadata title={product.productname} />

      <div className="row f-flex justify-content-around latesttextprodel ">
        <div
          className="col-12 col-lg-5 img-fluid productImg"
          id="product_image"
        >
          <img
            alt="img"
            className="proimg"
            src={product.image ? product.image : ""}
            style={{ marginBottom: "10rem" }}
          />
        </div>

        <div style={{ marginRight: "2rem" }} className="col-12 col-lg-5 mt-5">
          <h3>{product.productname}</h3>
          <p id="product_id">Product # {product._id}</p>

          <p id="product_price">₹{product.price}</p>

          {user ? (
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ml-4"
              disabled={product.stock === 0}
              onClick={addToCart}
            >
              Add to Cart
            </button>
          ) : (
            <div className="alert alert-danger mt-5" type="alert">
              Login Require to add to cart
            </div>
          )}

          <hr />

          <p>Status:{product && product.status}</p>

          <hr />

          <h4 className="mt-2">Description:</h4>
          <p>{product.desc}</p>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default RentalDetails;
