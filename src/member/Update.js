import { useEffect, useState } from "react";
import CheckError from "./CheckError";
import axios from "axios";

function Update(props)
{
    const arr = [
        { id: 1, name: "Admin" },
        { id: 2, name: "Member" }
      ];
    const [errors, setErrors] = useState({});
    const [getFile, setFile] = useState([]);
    const [avatar, setAvatar] = useState("");
    const [user, setUser] = useState({

        username: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        avatar: "",
        level: 0
      });
      useEffect(()=>{
        let userData= JSON.parse(localStorage.getItem("Auth"));
      console.log(userData)
      if(userData)
      {
        setUser({
            username: userData.name,
            email : userData.email,
            password:userData.password,
            address:userData.address,
            phone:userData.phone,
            avatar:userData.avatar,
            level:0
        })
        
      }    
      },[])
      const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setUser((state) => ({ ...state, [nameInput]: value }));
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
    
        if (user.username  === "") {
          errorsSubmit.name = "Vui Lòng Nhập Name";
          flag = false;
        }
        if (user.email === "") {
          errorsSubmit.email = "Vui Lòng Nhập Email";
          flag = false;
        } else if (!IsEmail(user.email)) {
          errorsSubmit.email = "Chưa đúng định dạng Email";
          flag = false;
        }
        if (user.password === "") {
          errorsSubmit.password = "Vui Lòng Nhập PassWord";
          flag = false;
        }
        if (user.phone === "") {
          errorsSubmit.phone = "Vui Lòng Nhập Phone";
          flag = false;
        }
        if (user.address === "") {
          errorsSubmit.address = "Vui Lòng Nhập address ";
          flag = false;
        }
        if (user.level === "") {
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
          alert("Update thông tin thất bại");
        } else {
          setErrors({});
        
          let Auth = JSON.parse(localStorage.getItem("Auth"));
          console.log(Auth)
          let Token = JSON.parse(localStorage.getItem("Token"));
          console.log(Token)
         
          let url = "http://localhost:8080/laravel8/public/api/user/update/"+ Auth.id;
          console.log(url)
          let config = { 
            headers: { 
            'Authorization': 'Bearer '+ Token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            } 
            
        };	
        console.log(config)
       
          const formData = new FormData();
           formData.append('name', user.username);
           formData.append('phone', user.phone);
           formData.append('address', user.address);
           formData.append('password', user.password);
          formData.append('email', user.email);
          formData.append('level', user.level);
        formData.append('avatar', getFile[0]);
         
          
          axios.post(url, formData, config)
            .then(response => {
              console.log(response);     
            })
            .catch(error => {
              console.log(error);      
            });
            alert("Update thông tin thanh cong"); 
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
          <h2>User Update!</h2>
          <form action="#"  onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="text" placeholder="Name...." name="username" onChange={handleInput}  value={user.username}/>
            <input type="email" placeholder="Email Address...." name="email" onChange={handleInput} readOnly  value={user.email}/>
            <input type="password" placeholder="Password...." name="password"onChange={handleInput}  value={user.password} />
            <input type="text" placeholder="Phone...." name="phone" onChange={handleInput} value={user.phone} />
            <input type="text" placeholder="Address...." name="address"onChange={handleInput}  value={user.address} />
            <input type="file" name="avatar" onChange={hanldeFile} />
            <select name="level" onChange={handleInput} value={user.level}>
            {renderSelect()}
            </select>
            <button type="submit" className="btn btn-default">Signup</button>
          </form>
            <CheckError errors ={errors}/>
        </div>
      </div>
    )
}
export default Update;