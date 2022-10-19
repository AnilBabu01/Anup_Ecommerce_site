import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
import Sidebar from "../sidebar/Sidebar";
import Loader from "../../loader/Loader";
import Metadata from "../../metadata/Metadata";
import "../shipping/shipping.css";
const RentalDetail = () => {
  const { id } = useParams();
  const [shipping, setshipping] = useState([]);
  const [rental, setrental] = useState([]);
  const getshippinginfo = async () => {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/rental/getsinglerental/${id}`
    );

    console.log("data from rental details", data.data.product);
    setrental(data.data.product);
  };
  useEffect(() => {
    getshippinginfo();
  }, []);

  return (
    <div>
      {/* <Metadata title={product.name} /> */}
      <div className="row">
        <div className="col-12 col-md-2" style={{ marginTop: "4.8rem" }}>
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="latesttext1  my-5">Shipping Details </h1>
          <div className="shippinginfomain">
            <div>
              <p>Product Name : {rental && rental.productname}</p>
              <p>Address : {rental && rental.address}</p>
              <p>Contact No : {rental && rental.phone}</p>
              <img
                className="reciept"
                src={rental && rental.image}
                alt={rental && rental.image}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalDetail;
