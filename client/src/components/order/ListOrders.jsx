import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../metadata/Metadata";
import Loader from "../loader/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../actions/orderActions";
import "./ListOrders.css";
const ListOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  console.log(orders);
  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  console.log(orders);
  return (
    <Fragment>
      <MetaData title={"My Orders"} />

      <h1 className="my-5 latesttext " style={{ textAlign: "center" }}>
        My Orders
      </h1>

      {loading ? (
        <Loader />
      ) : (
        <table>
          <tr>
            <th>Order ID</th>
            <th>Num Of Items</th>
            <th>Ammount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {orders &&
            orders.map((e, index) => {
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{e.orderItems.length}</td>
                    <td>{`₹${e.totalPrice}`}</td>
                    <td>
                      {e.orderStatus &&
                      String(e.orderStatus).includes("Delivered") ? (
                        <p style={{ color: "green" }}>{e.orderStatus}</p>
                      ) : (
                        <p style={{ color: "red" }}>{e.orderStatus}</p>
                      )}
                    </td>
                    <td>
                      {
                        <Link
                          to={`/order/${e._id}`}
                          className="btn btn-primary"
                        >
                          <i className="fa fa-eye mobleeye"></i>
                        </Link>
                      }
                    </td>
                  </tr>
                </>
              );
            })}
        </table>
      )}
    </Fragment>
  );
};

export default ListOrders;
