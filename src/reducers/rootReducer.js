import { combineReducers } from "redux";
import blogReducer from "./blogReducer";
import productDetailReducer from "./productDetailReducer";
import loginReducer from "./loginReducer";
import myproductReducer from "./myproductReducer";
import addproductReducer from "./addproductReducer";
import brandReducer from "./brandReducer";
const rootReducer = combineReducers({
  blogs: blogReducer,
  productdetail: productDetailReducer,
  login: loginReducer,
  myproduct: myproductReducer,
  addproduct: addproductReducer,
  category: brandReducer,
});
export default rootReducer;
