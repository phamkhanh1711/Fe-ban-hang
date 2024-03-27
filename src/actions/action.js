import axios from "axios";
import {
  FETCH_ADD_PRODUCT_ERROR,
  FETCH_ADD_PRODUCT_REQUEST,
  FETCH_ADD_PRODUCT_SUCCESS,
  FETCH_BLOG_ERROR,
  FETCH_BLOG_REQUEST,
  FETCH_BLOG_SUCCESS,
  FETCH_BRAND_ERROR,
  FETCH_BRAND_REQUEST,
  FETCH_BRAND_SUCCESS,
  FETCH_LOGIN_ERROR,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_PRODUCT_DETAIL_ERROR,
  FETCH_PRODUCT_DETAIL_REQUEST,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
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

export const fetchProductRequest = () => {
  return {
    type: FETCH_PRODUCT_REQUEST,
  };
};
export const fetchProductSuccess = (data) => {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    dataUsers: data,
  };
};

export const fetchProductError = () => {
  return {
    type: FETCH_PRODUCT_ERROR,
  };
};

export const fetchAllProduct = () => {
  return (dispatch, getState) => {
    dispatch(fetchProductRequest());
    const Token = JSON.parse(localStorage.getItem("Token")); // Lấy token từ local storage
    const config = {
      headers: {
        Authorization: "Bearer " + Token,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };

    axios
      .get("http://localhost:8080/laravel8/public/api/user/my-product", config) // Gửi yêu cầu với cấu hình config
      .then((res) => {
        console.log(res);
        dispatch(fetchProductSuccess(res.data.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchProductError(error));
      });
  };
};

export const fetchAddProductRequest = () => {
  return {
    type: FETCH_ADD_PRODUCT_REQUEST,
  };
};
export const fetchAddProductSuccess = (data) => {
  return {
    type: FETCH_ADD_PRODUCT_SUCCESS,
    dataUsers: data,
  };
};

export const fetchAddProductError = () => {
  return {
    type: FETCH_ADD_PRODUCT_ERROR,
  };
};
export const fetchAddProduct = (formData) => {
  return (dispatch, getState) => {
    dispatch(fetchAddProductRequest());
    const Token = JSON.parse(localStorage.getItem("Token")); // Lấy token từ local storage
    const config = {
      headers: {
        Authorization: "Bearer " + Token,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };

    axios
      .post(
        "http://localhost:8080/laravel8/public/api/user/my-product",
        formData,
        config
      )
      .then((res) => {
        dispatch(fetchAddProductSuccess(res));
        alert("Create product! Thành công");
      })
      .catch((error) => {
        dispatch(fetchAddProductError(error));
        alert("Create product! Thất bại");
      });
  };
};

//category brand
export const fetchBrandRequest = () => {
  return {
    type: FETCH_BRAND_REQUEST,
  };
};
export const fetchBrandSuccess = (data) => {
  return {
    type: FETCH_BRAND_SUCCESS,
    dataUsers: data,
  };
};

export const fetchBrandError = () => {
  return {
    type: FETCH_BRAND_ERROR,
  };
};
export const fetchAllBrand = () => {
  return (dispatch, getState) => {
    dispatch(fetchBrandRequest());
    axios
      .get("http://localhost:8080/laravel8/public/api/category-brand")
      .then((res) => {
        console.log(res);
        dispatch(fetchBrandSuccess(res.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchBrandError(error));
      });
  };
};
