import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  axios.defaults.headers.get["Authorization"] = `Bearer ${localStorage.getItem(
    "token"
  )}`;

  const { data } = await axios.get(
    `${process.env.REACT_APP_URL}/api/product/getSingleProduct/${id}`
  );

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].Url,
      stock: data.product.stock,
      quantity,
    },
  });

  console.log("hello");
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
