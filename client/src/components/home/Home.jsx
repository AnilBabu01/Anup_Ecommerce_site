import React, { useState, useEffect } from "react";
import Slideruse from "../slider/Silderuse";
import { useParams } from "react-router-dom";
import axios from "axios";
import Subhome from "./Subgome";
import Product from "../product/Product";
const Home = ({ match }) => {
  const [products, setproducts] = useState([]);
  const { keyword } = useParams();
  const getproduct = async () => {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/product/getAllProduct?category=${keyword}`
    );

    console.log("serch data", data.products);
    setproducts(data.products);
  };

  useEffect(() => {
    getproduct();
  }, [keyword]);

  return (
    <>
      {keyword ? (
        <>
          <div>
            <h1
              className="latesttext "
              id="products_heading"
              style={{ marginTop: "6rem" }}
            >
              Your Searched Item from {keyword}
            </h1>
          </div>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.slice(0, 4).map((product) => {
                  return (
                    <>
                      <Product key={product._id} product={product} />
                    </>
                  );
                })}
            </div>
          </section>
        </>
      ) : (
        <>
          <Slideruse />
          <Subhome />
        </>
      )}
    </>
  );
};

export default Home;
