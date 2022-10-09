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
import "./Home.css";
const Home = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [onstinegetuserinfo, setonstinegetuserinfo] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [imagess, setimagess] = useState("");
  const { keyword } = useParams();

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

  const getsilderimg = async () => {
    axios.defaults.headers.post[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/admin/getslider`,

      config
    );

    console.log("img data from home", data.data.images);

    setimagess(data.data.images);
  };
  useEffect(() => {
    getsilderimg();
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, error, alert, currentPage, keyword, price, category, rating]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onchancge = (e) => {
    setCategory(e.target.value);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title={"Buy best product by"} />
          <Slideruse image={imagess} />
          <div>
            <h1 className="latesttext " id="products_heading">
              Latest Products
            </h1>
          </div>

          {keyword ? (
            <>
              <hr className="my-5" />

              <div className="mt-5">
                <h4 className="mb-3">Categories</h4>
                <select id="cars" onChange={onchancge}>
                  {categories.map((category) => (
                    <option value={category} name={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <h4 className="mb-3">Ratings</h4>

                <ul className="pl-0">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <li
                      style={{
                        cursor: "pointer",
                        listStyleType: "none",
                      }}
                      key={star}
                      onClick={() => setRating(star)}
                    >
                      <div className="rating-outer">
                        <div
                          className="rating-inner"
                          style={{
                            width: `${star * 20}%`,
                          }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            ""
          )}

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

      {resPerPage <= productsCount && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </>
  );
};

export default Home;
