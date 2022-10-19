import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import MetaData from "../../metadata/Metadata";
import Loader from "../../loader/Loader";
import Sidebar from "../sidebar/Sidebar";
import { useAlert } from "react-alert";
const Rentaladmin = () => {
  const [shippings, setshippings] = useState([]);
  const [rental, setrental] = useState([]);
  const alert = useAlert();
  const getallshipping = async () => {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/rental/getAll`
    );

    console.log("rental from admin", data.data.rental);
    setrental(data.data.rental);
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
          label: "productname",
          field: "productname",
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

    rental.forEach((rental, index) => {
      data.rows.push({
        id: index + 1,
        productname: rental.productname,
        contact: rental.phone,
        status: rental.status,
        actions: (
          <Fragment>
            <Link
              to={`/admin/rentalDetails/${rental._id}`}
              className="btn btn-primary py-1 px-2"
              style={{ marginRight: "5px" }}
            >
              <i className="fa fa-eye"></i>
            </Link>
            <Link
              to={`/admin/rentalUpdate/${rental._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteshippingHandler(rental._id)}
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
      `${process.env.REACT_APP_URL}/api/rental/delete/${id}`
    );
    getallshipping();

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
          <h1 className="latesttext1  my-5">All Rental Product</h1>
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

export default Rentaladmin;
