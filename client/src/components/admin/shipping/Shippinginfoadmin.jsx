import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
import Sidebar from "../sidebar/Sidebar";
import Loader from "../../loader/Loader";
import Metadata from "../../metadata/Metadata";
import "./shipping.css";
const ShippingDetails = () => {
  const { id } = useParams();
  const [shipping, setshipping] = useState([]);
  const getshippinginfo = async () => {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/shiping/getinfo/${id}`
    );

    setshipping(data.data.shipping);
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
              <p>Customer Name : {shipping && shipping.name}</p>
              <p>Address : {shipping && shipping.address}</p>
              <p>Contact No : {shipping && shipping.phone}</p>
              <img
                className="reciept"
                src={shipping && shipping.image}
                alt={shipping && shipping.image}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
