import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import Register from "./member/Register";
import Login from "./member/Login";
import Home from "./member/Home";
import Detail from "./Blog/Detail";
import Comment from "./Blog/Comment";
import Blog_Detail from "./Blog/Blog_Detail";
import Blog from "./Blog/Blog";
import Rate from "./Blog/Rate";

import Update from "./member/Update";
import MyProduct from "./product/MyProduct";
import AddProduct from "./product/AddProduct";

import Update_Product from "./product/Update_Product";
import ProductDetail from "./product/ProductDetail";
import Cart from "./product/Cart";
import Home2 from "./member/Home2";
import store from "./redux/store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider store={store}>
      <App>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/detail/:id" element={<Blog_Detail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/rate" element={<Rate />} />
          <Route path="/myaccount" element={<MyProduct />} />
          <Route path="/account" element={<Update />} />
          <Route path="/productaccount" element={<AddProduct />} />
          <Route
            path="/updateaccount/:productId"
            element={<Update_Product />}
          />
          <Route path="/product/detail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path='/home2' element={<Home2/>}/> */}
        </Routes>
      </App>
    </Provider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
