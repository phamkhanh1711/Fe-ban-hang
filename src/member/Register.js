import { useState } from "react";
import CheckError from "./CheckError";
import axios from "axios";

function Register(props) {
  const arr = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Member" }
  ];
  
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    avatar: "",
    level: 0
  });

  const [errors, setErrors] = useState({});
  const [getFile, setFile] = useState([]);
  const [avatar, setAvatar] = useState("");

  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };

  function hanldeFile(e) {
    const file = e.target.files;
    const reader = new FileReader();
    reader.onload = (e) => {
     
      setAvatar(e.target.result);
      setFile(file);
     
    };
    reader.readAsDataURL(file[0]);
    
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;

    if (inputs.name === "") {
      errorsSubmit.name = "Vui Lòng Nhập Name";
      flag = false;
    }
    if (inputs.email === "") {
      errorsSubmit.email = "Vui Lòng Nhập Email";
      flag = false;
    } else if (!IsEmail(inputs.email)) {
      errorsSubmit.email = "Chưa đúng định dạng Email";
      flag = false;
    }
    if (inputs.password === "") {
      errorsSubmit.password = "Vui Lòng Nhập PassWord";
      flag = false;
    }
    if (inputs.phone === "") {
      errorsSubmit.phone = "Vui Lòng Nhập Phone";
      flag = false;
    }
    if (inputs.address === "") {
      errorsSubmit.address = "Vui Lòng Nhập address ";
      flag = false;
    }
    if (inputs.level === "") {
      errorsSubmit.level = "Vui Lòng Nhập level ";
      flag = false;
    }
    if (getFile.length === 0) {
      errorsSubmit.avatar = "Vui lòng chọn file";
      flag = false;
    } else {
      let size = getFile[0].size;
      let name = getFile[0].name;
      let ext = name.split(".").pop();
      let arrayExt = ["png", "jpg", "jpeg"];
      if (!arrayExt.includes(ext)) {
        errorsSubmit.avatar = "Chỉ được upLoad file 'png', 'jpg', 'jpeg'";
        setFile([]);
        flag = false;
      } else if (size > 1024 * 1024) {
        errorsSubmit.avatar = "File quá lớn (tối đa 1MB)";
        flag = false;
      }
    }

    if (!flag) {
      setErrors(errorsSubmit);
      alert("Login Thất bại");
    } else {
      setErrors({});            
      const data = {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        phone: inputs.phone,
        address: inputs.address,
        avatar: avatar,
        level: 0
      };

      axios
        .post("http://localhost:8080/laravel8/public/api/register", data)
        .then((res) => {
          console.log(res);
          console.log(res.data[0].avatar)
          if (res.data.error) {
            setErrors(res.data.error);
          } else {
            alert("Thanh Cong");
          }
        })
        .catch((error) => {
          console.error(error.res.data);  
        });
    }
  }

  function IsEmail(email) {
    let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
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
    <div className="col-sm-4">
      <div className="signup-form">
        <h2>New User Signup!</h2>
        <form action="#" onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" placeholder="Name...." name="name" onChange={handleInput} />
          <input type="email" placeholder="Email Address...." name="email" onChange={handleInput} />
          <input type="password" placeholder="Password...." name="password" onChange={handleInput} />
          <input type="text" placeholder="Phone...." name="phone" onChange={handleInput} />
          <input type="text" placeholder="Address...." name="address" onChange={handleInput} />
          <input type="file" name="avatar" onChange={hanldeFile} />
          <select name="level" onChange={handleInput}>
            {renderSelect()}
          </select>
          <button type="submit" className="btn btn-default">Signup</button>
        </form>
        <CheckError errors={errors} />
      </div>
    </div>
  );
}

export default Register;
