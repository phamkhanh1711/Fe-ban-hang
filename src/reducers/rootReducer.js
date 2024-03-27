import { combineReducers } from "redux";
import blogReducer from "./blogReducer";
import productDetailReducer from "./productDetailReducer";
import loginReducer from "./loginReducer";
const rootReducer = combineReducers({
  blogs: blogReducer,
  productdetail: productDetailReducer,
  login: loginReducer,
});
export default rootReducer;
