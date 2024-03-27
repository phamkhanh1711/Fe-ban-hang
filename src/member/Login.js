import { useState } from "react";
import CheckError from "./CheckError";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../actions/action";

function Login(props) {
  const arr = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Member" },
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    level: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;

    if (!formData.email) {
      errorsSubmit.email = "Vui lòng nhập Email";
      flag = false;
    } else if (!IsEmail(formData.email)) {
      errorsSubmit.email = "Email không hợp lệ";
      flag = false;
    }
    if (!formData.password) {
      errorsSubmit.password = "Vui lòng nhập Password";
      flag = false;
    }

    if (!flag) {
      setErrors(errorsSubmit);
      alert("Login Thất bại");
    } else {
      const data = dispatch(
        fetchLogin(formData.email, formData.password, formData.level)
      );
      localStorage.setItem("isLoggedIn", JSON.stringify({ loggedIn: true }));

      const Token = data.token;
      console.log(Token);
      localStorage.setItem("Token", JSON.stringify(Token));

      const Auth = data;
      console.log(Auth);

      localStorage.setItem("Auth", JSON.stringify(Auth));

      navigate("/blog");
      alert("Login Thanh Cong");
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
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="Password...."
            name="password"
            onChange={handleInput}
          />
          <select name="level" onChange={handleInput}>
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
