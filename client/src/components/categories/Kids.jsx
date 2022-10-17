import React, { useEffect, useState } from "react";
import axios from "axios";
import Slideruse from "../slider/Silderuse";
import ComNavlink from "./ComNavlink";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "../product/Product";
const Kids = () => {
  const [products, setproducts] = useState([]);
  const getproduct = async () => {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/product/getAllProduct?category=Kids`
    );

    console.log("ele category", data.products);
    setproducts(data.products);
  };
  useEffect(() => {
    getproduct();
  }, []);

  return (
    <div>
      <ComNavlink />
      <div>
        <h1 className="latesttext " id="products_heading">
          Kids
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
      <Slideruse />
    </div>
  );
};

export default Kids;
