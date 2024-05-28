import {
  FETCH_BRAND_ERROR,
  FETCH_BRAND_REQUEST,
  FETCH_BRAND_SUCCESS,
} from "../actions/types";

export const INITIAL_STATE = {
  brand: [],
};

const brandReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BRAND_REQUEST:
      console.log("FETCH_BRAND_REQUEST", action);
      return {
        ...state,
      };

    case FETCH_BRAND_SUCCESS:
      console.log("FETCH_BRAND_SUCCESS", action);
      return {
        ...state,
        brand: action.dataUsers,
      };
    case FETCH_BRAND_ERROR:
      console.log("FETCH_BRAND_ERROR", action);
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default brandReducer;
