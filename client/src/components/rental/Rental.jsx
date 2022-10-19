import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Rentalproduct from "./Rentalproduct";
import "./Rental.css";
const Rental = () => {
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();
  const getproduct = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/rental/getAll`
    );

    console.log("from rental", data.data.rental);
    setproducts(data.data.rental);
  };

  useEffect(() => {
    getproduct();
  }, []);

  return (
    <>
      <div style={{ marginTop: "5rem" }}></div>
      <div className="addrendivbtn">
        <button onClick={() => navigate("/addrental")} className="adddbutton">
          Add Rental
        </button>
        <button
          onClick={() => navigate("/deleterental")}
          className="adddbutton"
        >
          Delete Rental
        </button>
      </div>
      <h1 className="latesttext " id="products_heading">
        Rental Products
      </h1>
      <section id="products" className="container mt-5">
        <div className="row">
          {products &&
            products.map((product) => {
              return (
                <>
                  <Rentalproduct key={product._id} product={product} />
                </>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Rental;
