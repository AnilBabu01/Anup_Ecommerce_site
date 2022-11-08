import React, { useEffect, useState } from "react";
import axios from "axios";
import Slideruse from "../slider/Silderuse";
import ComNavlink from "./ComNavlink";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "../product/Product";
const Mobile = () => {
  const [products, setproducts] = useState([]);
  const getproduct = async () => {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/product/getAllProduct?category=Mobile`
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
        <h1 className="centertext" id="products_heading">
          Mobile
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
    </div>
  );
};

export default Mobile;
