import axios from "axios";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
} from "../constants/authConstants";

// Register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}/api/auth/regster`,
      userData,
      config
    );

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Login

export const login = (email, password) => async (dispatch) => {
  axios.defaults.withCredentials = true;

  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Credentials: "include",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}/api/auth/login`,
      { email, password },

      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//loader user
export const loadUser = () => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      Credentials: "include",
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/auth/me`
    );

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout user
export const logout = () => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    await axios.get(`${process.env.REACT_APP_URL}/api/auth/logout`);

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    axios.defaults.headers.put[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_URL}/api/auth/updateprofile`,
      userData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    axios.defaults.headers.put[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_URL}/api/auth/password/update`,
      passwords,
      config
    );

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    axios.defaults.headers.post[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}/api/auth/password/forgot`,
      email,
      config
    );

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    axios.defaults.headers.put[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    dispatch({ type: NEW_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_URL}/api/auth/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({
      type: NEW_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all users
export const allUsers = () => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    dispatch({ type: ALL_USERS_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/auth/admin/users`
    );

    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update user - ADMIN
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    axios.defaults.headers.put[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_URL}/api/auth/admin/user/${id}`,
      userData,
      config
    );

    console.log("data form update api", data, userData);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get user details - ADMIN
export const getUserDetails = (id) => async (dispatch) => {
  try {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/auth/admin/user/${id}`
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete user - ADMIN
export const deleteUser = (id) => async (dispatch) => {
  try {
    axios.defaults.headers.delete[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(
      `${process.env.REACT_APP_URL}/api/auth/admin/user/${id}`
    );

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
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
