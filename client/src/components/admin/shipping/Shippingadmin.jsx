import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import MetaData from "../../metadata/Metadata";
import Loader from "../../loader/Loader";
import Sidebar from "../sidebar/Sidebar";

const Shippingadmin = () => {
  const [shippings, setshippings] = useState([]);

  const getallshipping = async () => {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/shiping/get`
    );

    console.log("all data from shiipin", data.data.shippings);
    setshippings(data.data.shippings);
  };

  useEffect(() => {
    getallshipping();
  }, []);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },

        {
          label: "Customername",
          field: "customername",
        },
        {
          label: "Contact",
          field: "contact",
        },
        {
          label: "Status",
          field: "status",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    shippings.forEach((shipping, index) => {
      data.rows.push({
        id: index + 1,
        customername: shipping.name,
        contact: shipping.phone,
        status: shipping.status,
        actions: (
          <Fragment>
            <Link
              to={`/admin/shippingdetails/${shipping._id}`}
              className="btn btn-primary py-1 px-2"
              style={{ marginRight: "5px" }}
            >
              <i className="fa fa-eye"></i>
            </Link>
            <Link
              to={`/admin/shippingupdate/${shipping._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteshippingHandler(shipping._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteshippingHandler = async (id) => {
    axios.defaults.headers.delete[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    const data = await axios.delete(
      `${process.env.REACT_APP_URL}/api/admin/product/deleteProduct/${id}`
    );

    console.log("delete is", data.data.status);
    if (data.data.status === true) {
      alert.success("Product deleted successfully");
    }
  };

  return (
    <Fragment>
      <MetaData title={"All Products"} />
      <div className="row">
        <div className="col-12 col-md-2" style={{ marginTop: "4.8rem" }}>
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="latesttext1  my-5">All Shipping</h1>
          <MDBDataTable
            data={setProducts()}
            className="px-3"
            bordered
            striped
            hover
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Shippingadmin;