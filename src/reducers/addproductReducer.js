import {
  FETCH_ADD_PRODUCT_ERROR,
  FETCH_ADD_PRODUCT_REQUEST,
  FETCH_ADD_PRODUCT_SUCCESS,
} from "../actions/types";

export const INITIAL_STATE = {
  addproduct: [],
};

const addproductReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ADD_PRODUCT_REQUEST:
      console.log("FETCH_ADD_PRODUCT_REQUEST", action);
      return {
        ...state,
      };

    case FETCH_ADD_PRODUCT_SUCCESS:
      console.log("FETCH_ADD_PRODUCT_SUCCESS", action);
      return {
        ...state,
        addproduct: action.dataUsers,
      };
    case FETCH_ADD_PRODUCT_ERROR:
      console.log("FETCH_ADD_PRODUCT_ERROR", action);
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default addproductReducer;
