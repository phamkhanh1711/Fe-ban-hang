import {
  FETCH_HOME_ERROR,
  FETCH_HOME_REQUEST,
  FETCH_HOME_SUCCESS,
} from "../actions/types";

export const INITIAL_STATE = {
  homeProduct: [],
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_HOME_REQUEST:
      console.log("FETCH_HOME_REQUEST", action);
      return {
        ...state,
      };

    case FETCH_HOME_SUCCESS:
      console.log("FETCH_HOME_SUCCESS", action);
      return {
        ...state,
        homeProduct: action.dataUsers,
      };
    case FETCH_HOME_ERROR:
      console.log("FETCH_HOME_ERROR", action);
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default homeReducer;
