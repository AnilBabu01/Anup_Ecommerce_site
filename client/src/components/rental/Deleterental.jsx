import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Rentalproduct from "./Rentalproduct";
import "./Rental.css";
const Deleterental = () => {
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();
  const getproduct = async () => {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/rental/usergetAll`
    );

    console.log("from rental", data.data.rental);
    setproducts(data.data.rental);
  };

  useEffect(() => {
    getproduct();
  }, []);

  return (
    <>
      <div style={{ marginTop: "6rem" }}>
        <h1 className="latesttext " id="products_heading">
          Your Rental Products
        </h1>
      </div>

      <section id="products" className="container mt-5">
        <div className="row">
          {products &&
            products.map((product) => {
              return (
                <>
                  <Rentalproduct
                    key={product._id}
                    product={product}
                    deleted={true}
                    getproduct={getproduct}
                  />
                </>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Deleterental;
