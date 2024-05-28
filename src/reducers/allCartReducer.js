import {
  FETCH_ALL_CART_ERROR,
  FETCH_ALL_CART_SUCCESS,
  FETCH_All_CART_REQUEST,
} from "../actions/types";

export const INITIAL_STATE = {
  cart: [],
};

const allCartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_All_CART_REQUEST:
      console.log("FETCH_All_CART_REQUEST", action);
      return {
        ...state,
      };

    case FETCH_ALL_CART_SUCCESS:
      console.log("FETCH_ALL_CART_SUCCESS", action);
      return {
        ...state,
        cart: action.dataUsers,
      };
    case FETCH_ALL_CART_ERROR:
      console.log("FETCH_ALL_CART_ERROR", action);
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default allCartReducer;
