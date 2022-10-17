import React, { useEffect, useState } from "react";
import axios from "axios";
import "rc-slider/assets/index.css";
import Metadata from "../metadata/Metadata";
import Product from "../product/Product";
import Loader from "../loader/Loader";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts, clearErrors } from "../actions/productActions";
import Slideruse from "../slider/Silderuse";
import { loadUser } from "../actions/authActions";
import Navbar from "../header/Navbar";
import "./Home.css";

const Subhome = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [onstinegetuserinfo, setonstinegetuserinfo] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const { keyword } = useParams();
  const [electronic, setelectronic] = useState([]);
  const [mobile, setmobile] = useState([]);
  const [accessories, setaccessories] = useState([]);
  const [clothing, setclothing] = useState([]);
  const [lewellery, setlewellery] = useState([]);
  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  if (onstinegetuserinfo === true) {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loadUser());
      setonstinegetuserinfo(false);
    }
  }

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, error, alert, currentPage, keyword, price, category, rating]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title={"Buy best product by"} />

          <div>
            <h1 className="latesttext " id="products_heading">
              Welcome To Nepalikart
            </h1>
          </div>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => {
                  return (
                    <>
                      <Product key={product._id} product={product} />
                    </>
                  );
                })}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Subhome;
