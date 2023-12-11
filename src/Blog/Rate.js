import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";
import StarRatings from "react-star-ratings";
import axios from "axios";

function Rate(props) {

  const [rating , setRating  ] = useState(0)
  const navigate = useNavigate();

  function  changeRating(newRating , name )
  {
    setRating(newRating)
    var isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    console.log(isLoggedIn)

    if(isLoggedIn)
    {
      const idBlog = {props}

      console.log(idBlog)
      let Token = JSON.parse(localStorage.getItem("Token"));
      console.log(Token)
      let Auth = JSON.parse(localStorage.getItem("Auth"));
      console.log(Auth)
      let url = "http://localhost:8080/laravel8/public/api/blog/rate/" + props.idBlog;
      console.log(url)

              
      let config = { 
        headers: { 
        'Authorization': 'Bearer '+ Token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
        }         
    };	

   
      const formData = new FormData();
        formData.append('blog_id', props.idBlog);
        formData.append('user_id', Auth.id);
        formData.append('rate', newRating);
        
     

        axios.post(url, formData, config)
        .then(response => {
          console.log(response);
          
        })
        .catch(error => {
          console.log(error);
          
        });
     


    }
    else{
      alert("Vui long login sau khi danh gia")
      navigate('/login') 
    }

  }


    return(
      <div>
          <StarRatings rating = {rating} starRatedColor="blue" 
      changeRating={changeRating} 
      numberOfStars={6} name ='rate'  />
      
      </div>
    
      
    );
}
export default Rate;

  

   