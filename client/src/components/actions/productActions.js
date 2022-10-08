import axios from "axios";

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";
axios.defaults.headers.get["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

axios.defaults.headers.post["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;
export const getProducts =
  (keyword = "", currentPage, price = 0, category, rating) =>
  async (dispatch) => {
    try {
      axios.defaults.headers.get[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;

      axios.defaults.headers.post[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      dispatch({ type: ALL_PRODUCTS_REQUEST });

      let link = `${process.env.REACT_APP_URL}/api/product/getAllProduct?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;
      if (category) {
        link = `${process.env.REACT_APP_URL}/api/product/getAllProduct?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
      }
      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios.defaults.headers.post[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/product/getSingleProduct/${id}`
    );

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

///new review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios.defaults.headers.put[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_URL}/api/product/review`,
      reviewData,
      config
    );

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

///get admin  Allproducts

export const getAdminProducts = () => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios.defaults.headers.post[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    dispatch({ type: ADMIN_PRODUCTS_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/admin/getallproduct`
    );

    dispatch({
      type: ADMIN_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

/// create new product by admin

export const newProduct = (productData) => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios.defaults.headers.post[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}/api/admin/product/create`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete product (Admin)
export const deleteProduct = (id) => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios.defaults.headers.delete[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(
      `${process.env.REACT_APP_URL}/api/admin/product/deleteProduct/${id}`
    );

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product (ADMIN)
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios.defaults.headers.put[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_URL}/api/admin/product/updateProduct/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get product reviews
export const getProductReviews = (id) => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios.defaults.headers.post[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    dispatch({ type: GET_REVIEWS_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/admin/product/reviews/${id}`
    );

    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete product review
export const deleteReview = (id, productId) => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios.defaults.headers.delete[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `${process.env.REACT_APP_URL}/api/admin/productreview?id=${id}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log(error.response);

    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
