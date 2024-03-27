import axios from "axios";
import {
  FETCH_BLOG_ERROR,
  FETCH_BLOG_REQUEST,
  FETCH_BLOG_SUCCESS,
  FETCH_LOGIN_ERROR,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_PRODUCT_DETAIL_ERROR,
  FETCH_PRODUCT_DETAIL_REQUEST,
  FETCH_PRODUCT_DETAIL_SUCCESS,
} from "./types";
import { useParams } from "react-router-dom";

export const fetchBlogRequest = () => {
  return {
    type: FETCH_BLOG_REQUEST,
  };
};
export const fetchBlogSuccess = (data) => {
  return {
    type: FETCH_BLOG_SUCCESS,
    dataUsers: data,
  };
};

export const fetchBLogError = () => {
  return {
    type: FETCH_BLOG_ERROR,
  };
};

export const fetchAllBlog = () => {
  return (dispatch, getState) => {
    dispatch(fetchBlogRequest());
    axios
      .get("http://localhost:8080/laravel8/public/api/blog")
      .then((res) => {
        console.log(res);
        dispatch(fetchBlogSuccess(res.data.blog.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchBLogError(error));
      });
  };
};

export const fetchproductDetailRequest = () => {
  return {
    type: FETCH_PRODUCT_DETAIL_REQUEST,
  };
};
export const fetchproductDetailSuccess = (data) => {
  return {
    type: FETCH_PRODUCT_DETAIL_SUCCESS,
    dataUsers: data,
  };
};

export const fetchproductDetailError = () => {
  return {
    type: FETCH_PRODUCT_DETAIL_ERROR,
  };
};
export const fetchproductDetail = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchproductDetailRequest());
    axios
      .get(`http://localhost:8080/laravel8/public/api/product/detail/${id}`)
      .then((res) => {
        console.log(res);
        dispatch(fetchproductDetailSuccess(res.data.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchproductDetailError(error));
      });
  };
};

export const fetchLoginRequest = () => {
  return {
    type: FETCH_LOGIN_REQUEST,
  };
};
export const fetchLoginSuccess = (data) => {
  return {
    type: FETCH_LOGIN_SUCCESS,
    dataUsers: data,
  };
};

export const fetchLoginError = () => {
  return {
    type: FETCH_LOGIN_ERROR,
  };
};
export const fetchLogin = (email, password, level) => {
  return async (dispatch) => {
    dispatch(fetchLoginRequest());
    try {
      const response = await axios.post(
        "http://localhost:8080/laravel8/public/api/login",
        { email, password, level }
      );
      dispatch(fetchLoginSuccess(response.data));
      return response.data; // Optionally return data
    } catch (error) {
      dispatch(fetchLoginError(error));
      throw error; // Re-throw error for handling in component
    }
  };
};
