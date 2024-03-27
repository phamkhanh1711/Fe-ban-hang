import {
  FETCH_PRODUCT_DETAIL_ERROR,
  FETCH_PRODUCT_DETAIL_REQUEST,
  FETCH_PRODUCT_DETAIL_SUCCESS,
} from "../actions/types";

export const INITIAL_STATE = {
  productdetail: [],
};

const productDetailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_DETAIL_REQUEST:
      console.log("FETCH_PRODUCT_DETAIL_REQUEST", action);
      return {
        ...state,
      };

    case FETCH_PRODUCT_DETAIL_SUCCESS:
      console.log("FETCH_PRODUCT_DETAIL_SUCCESS", action);
      return {
        ...state,
        productdetail: action.dataUsers,
      };
    case FETCH_PRODUCT_DETAIL_ERROR:
      console.log("FETCH_PRODUCT_DETAIL_ERROR", action);
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default productDetailReducer;
