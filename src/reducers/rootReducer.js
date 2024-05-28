import { combineReducers } from "redux";
import blogReducer from "./blogReducer";
import productDetailReducer from "./productDetailReducer";
import loginReducer from "./loginReducer";
import myproductReducer from "./myproductReducer";
import addproductReducer from "./addproductReducer";
import brandReducer from "./brandReducer";
import homeReducer from "./homeReducer";
import addCartReducer from "./addCartReducer";
import allCartReducer from "./allCartReducer";

const rootReducer = combineReducers({
  blogs: blogReducer,
  productdetail: productDetailReducer,
  login: loginReducer,
  myproduct: myproductReducer,
  addproduct: addproductReducer,
  category: brandReducer,
  homeProduct: homeReducer,
  addtocart: addCartReducer,
  allCart: allCartReducer,
});
export default rootReducer;
