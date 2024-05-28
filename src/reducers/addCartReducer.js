import {
  FETCH_CART_ERROR,
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
} from "../actions/types";

export const INITIAL_STATE = {
  cartItems: {},
};

const addproductReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CART_SUCCESS:
      const productId = action.payload;
      const updatedCartItems = { ...state.cartItems };
      updatedCartItems[productId] = (updatedCartItems[productId] || 0) + 1;
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    default:
      return state;
  }
};

export default addproductReducer;
