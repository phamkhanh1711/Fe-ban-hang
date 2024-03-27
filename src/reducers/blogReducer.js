import {
  FETCH_BLOG_ERROR,
  FETCH_BLOG_REQUEST,
  FETCH_BLOG_SUCCESS,
} from "../actions/types";

export const INITIAL_STATE = {
  listBlog: [],
};

const blogReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BLOG_REQUEST:
      console.log("FETCH_BLOG_REQUEST", action);
      return {
        ...state,
      };

    case FETCH_BLOG_SUCCESS:
      console.log("FETCH_BLOG_SUCCESS", action);
      return {
        ...state,
        listBlog: action.dataUsers,
      };
    case FETCH_BLOG_ERROR:
      console.log("FETCH_BLOG_ERROR", action);
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default blogReducer;
