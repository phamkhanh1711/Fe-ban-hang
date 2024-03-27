import {
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
} from "../actions/types";

export const INITIAL_STATE = {
  myproduct: [],
};

const myproductReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      console.log("FETCH_PRODUCT_REQUEST", action);
      return {
        ...state,
      };

    case FETCH_PRODUCT_SUCCESS:
      console.log("FETCH_PRODUCT_SUCCESS", action);
      return {
        ...state,
        myproduct: action.dataUsers,
      };
    case FETCH_PRODUCT_ERROR:
      console.log("FETCH_PRODUCT_ERROR", action);
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default myproductReducer;
