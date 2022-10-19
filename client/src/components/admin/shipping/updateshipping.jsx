import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
import Sidebar from "../sidebar/Sidebar";
import Loader from "../../loader/Loader";
import Metadata from "../../metadata/Metadata";

const ShippingDetails = () => {
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const alert = useAlert();
  const updateOrderHandler = async () => {
    axios.defaults.headers.put[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    const data = await axios.put(
      `${process.env.REACT_APP_URL}/api/shiping/update/${id}`,
      {
        status: status,
      }
    );
    if (data.data.status === true) {
      alert.success("Shipping Updated successfully");
    }
  };

  return (
    <div>
      {/* <Metadata title={product.name} /> */}
      <div className="row">
        <div className="col-12 col-md-2" style={{ marginTop: "4.8rem" }}>
          <Sidebar />
        </div>

        <div className="col-12 col-lg-3 mt-5" style={{ padding: "13px" }}>
          <h4 className="my-4">Status</h4>

          <div className="form-group">
            <select
              className="form-control"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <button
            className="btn btn-primary btn-block"
            onClick={() => updateOrderHandler(id)}
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
