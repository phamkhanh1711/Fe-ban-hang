import {
  FETCH_LOGIN_ERROR,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_PRODUCT_DETAIL_ERROR,
} from "../actions/types";

export const INITIAL_STATE = {
  login: [],
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      console.log("FETCH_LOGIN_REQUEST", action);
      return {
        ...state,
      };

    case FETCH_LOGIN_SUCCESS:
      console.log("FETCH_LOGIN_SUCCESS", action);
      return {
        ...state,
        login: action.dataUsers,
      };
    case FETCH_LOGIN_ERROR:
      console.log("FETCH_LOGIN_ERROR", action);
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default loginReducer;
