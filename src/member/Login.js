import { useState } from "react";
import CheckError from "./CheckError";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../actions/action";

function Login(props) {
  const arr = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Member" },
  ];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useSelector((state) => state.login.login);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "level") setLevel(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;

    if (!email) {
      errorsSubmit.email = "Vui lòng nhập Email";
      flag = false;
    } else if (!IsEmail(email)) {
      errorsSubmit.email = "Email không hợp lệ";
      flag = false;
    }
    if (!password) {
      errorsSubmit.password = "Vui lòng nhập Password";
      flag = false;
    }

    if (!flag) {
      setErrors(errorsSubmit);
      alert("Login Thất bại");
    } else {
      dispatch(fetchLogin(email, password, level))
        .then((data) => {
          localStorage.setItem(
            "isLoggedIn",
            JSON.stringify({ loggedIn: true })
          );
          if ((data && data.token) || (data && data.Auth)) {
            // Thực hiện các hành động với token
            const Token = data.token;
            console.log(Token);
            localStorage.setItem("Token", JSON.stringify(Token));
            const Auth = data.Auth;
            console.log(Auth);
            localStorage.setItem("Auth", JSON.stringify(Auth));

            navigate("/blog");
          } else {
            // Xử lý khi không có token trong dữ liệu trả về
            console.error("Không có token trong dữ liệu đăng nhập");
          }
        })
        .catch((error) => {
          // Xử lý khi có lỗi trong quá trình đăng nhập
          console.error("Lỗi khi đăng nhập:", error);
        });
    }
  };

  function IsEmail(email) {
    let regex =
      /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  function renderSelect() {
    return arr.map((item) => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ));
  }

  return (
    <div className="col-sm-4 col-sm-offset-1">
      <div className="login-form">
        {/*login form*/}
        <h2>Login to your account</h2>
        <form action="#" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="Password...."
            name="password"
            value={password}
            onChange={handleInput}
          />
          <select name="level" value={level} onChange={handleInput}>
            {renderSelect()}
          </select>
          <span>
            <input type="checkbox" className="checkbox" />
            Keep me signed in
          </span>
          <button type="submit" className="btn btn-default">
            Login
          </button>
        </form>
        <CheckError errors={errors} />
      </div>
      {/*/login form*/}
    </div>
  );
}

export default Login;
