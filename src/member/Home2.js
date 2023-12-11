// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import React, { useContext, useEffect, useState } from 'react';
// import axios from "axios";
//  import { UserContext } from "../UserContext";

// function Home2() {
//     const user = useContext(UserContext)

//    console.log(user)
//    const location = useLocation();
//     const navigate = useNavigate();
//     const handlehome = () => {
//         navigate("/");
//       };

//       const [getData, setData] = useState('');

//       useEffect(() => {
//         axios
//           .get('http://localhost:8080/laravel8/public/api/product')
//           .then(res => {
//             console.log(res);
//             setData(res.data.data);
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       }, []);

//       const newProducts = location.state?.newProducts || {};
//       function addtocart(e) {
        
//         let getId = e.target.id;
//         let obj = {};
//         obj[getId] = 1;
        
//         var a = 1;
//         var xx = localStorage.getItem("khanh");
//         if (xx) {
//           obj = JSON.parse(xx);
      
//           Object.keys(obj).map(function (key, index) {
//             if (key === getId) {
             
//               obj[key] += 1;
//               a = 2;
//             }
//           });
//           if (a === 1) {
            
//             obj[getId] = 1;
            
//           }
//         }
//        console.log( obj)
       
//        let tongqty = Object.values(obj).reduce((total, qty) => total + qty, 0);
//        user.loginContext(tongqty);
       
    
        
       
//         localStorage.setItem("khanh", JSON.stringify(obj));
    
        
//       }
//       function fetchData() {
//         if (Object.keys(getData).length > 0) {
//           return Object.keys(getData).map((key) => {
//             var arr = getData[key]["image"];
//             let img = JSON.parse(arr);
    
//         return (
//           <div className="col-sm-4" key={key}>
//             <div className="product-image-wrapper">
//               <div className="single-products">
//                 <div className="productinfo text-center">
//                   <img src={"http://localhost:8080/laravel8/public/upload/product/" + getData[key].id_user + "/" +img[0]} />
//                   <h2>${getData[key].price}</h2>
//                   <p>{getData[key].name}</p>
//                   <a href="#" onClick={addtocart} id={getData[key].id} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//                 </div>
//                 <div className="product-overlay">
//                   <div className="overlay-content">
//                   <h2>${getData[key].price}</h2>
//                   <p>{getData[key].name}</p>
//                   <a href="#" onClick={addtocart} id={getData[key].id} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
//                   </div>
//                 </div>
//                 <Link className="btn btn-primary" to={"/product/detail/"+ getData[key].id}>Read More</Link>
//               </div>
//               <div className="choose">
//                 <ul className="nav nav-pills nav-justified">
//                   <li><a href=""><i className="fa fa-plus-square" />Add to wishlist</a></li>
//                   <li><a href=""><i className="fa fa-plus-square" />Add to compare</a></li>
//                 </ul>
//               </div>
//             </div>
            
//           </div>
          
//         );
//       });
//     }
//     }
    
      
//   return (
//     <div className="col-sm-9 padding-right">
//     <div className="features_items">
//       <h2 className="title text-center">New Products</h2>
//       {fetchData()}
     
//     </div>
//   </div>
//   );
// }

// export default Home2;
