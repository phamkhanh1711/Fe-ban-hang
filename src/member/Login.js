import { useState } from "react";
import CheckError from "./CheckError";
import axios from "axios";
import { json, useNavigate } from "react-router-dom";


function Login(props)
{
    
  const arr = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Member" }
  ];
  
    const  [inputs , setInputs] = useState({
       
        email:"",
        password:"",
        level:0
       })
       const navigate = useNavigate();

       const [errors , setErrors] = useState({})
       const handleInput  =  (e) =>{
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({...state , [nameInput]:value}))
       }
       function handleSubmit (e)
    {
      e.preventDefault();
      let errorsSubmit = {};
      let flag = true;
     
      if(inputs.email == "")
      {
        errorsSubmit.email = "Vui Lòng Nhập Email"
        flag = false;
      } else if (IsEmail(inputs.email)== false){
        errorsSubmit.email = "Chưa đúng định dạng Email"   
        flag = false;
      }
      if(inputs.password == "")
        {
          errorsSubmit.password = "Vui Lòng Nhập PassWord";
          flag = false;
        }
      if (!flag) {
        setErrors(errorsSubmit);
        alert("Login Thất bại")
      } else 
      {
        const data = {
           
            email:inputs.email,
            password:inputs.password,
           
            level:0
        }
      
       axios.post("http://localhost:8080/laravel8/public/api/login",data)
       .then((res) =>{
        console.log(res)
        // alert("Đăng ký thành công!");
        if(res.data.error)
        {
          setErrors(res.data.error);
        }else{

        
          localStorage.setItem('isLoggedIn', JSON.stringify({loggedIn: true}));
          
        
          

          const Token = res.data.token
          console.log(Token)
          localStorage.setItem('Token',JSON.stringify( Token));

          const Auth = res.data
          console.log(Auth)

          localStorage.setItem('Auth',JSON.stringify( Auth));

          navigate('/blog') 
          alert("Login Thanh Cong")
        }

      })
      .catch(error => {
        console.log(error);
       
      });
    }
    }
    function IsEmail(email) {
        let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!regex.test(email)) {
          return false;
        }else{
          return true;
        }
      }
      function renderSelect(){
        return arr.map((item) => {
          return (
            <option key={item.id} value={item.id}>
            {item.name}
            </option>
          )
        })
      }   
  return (
    <div className="col-sm-4 col-sm-offset-1">
    <div className="login-form">{/*login form*/}
      <h2>Login to your account</h2>
      <form action="#" onSubmit={handleSubmit} >
       
        <input type="email" placeholder="Email Address"name="email" onChange={handleInput} />
        <input type="password" placeholder="Password...." name="password"  onChange={handleInput} />
        <select name="level" onChange={handleInput}>
             
               {renderSelect()}
              </select>
        <span>
          <input type="checkbox" className="checkbox" /> 
          Keep me signed in
        </span>
        <button type="submit" className="btn btn-default">Login</button>
      </form>
        <CheckError errors ={errors} />
    </div>{/*/login form*/}
  </div>
      );
}
export default Login