  import axios from "axios";
  import { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import Update_Product from "./Update_Product";

  function MyProduct() {
    
    const [getproducts, setProducts] = useState([]);
    
    const navigate = useNavigate();
    const handleAddNew = () => {
      navigate("/productaccount");
    };
    const handleUpdateNew = (productId) => {
      navigate(`/updateaccount/${productId}`);
    };
    const Token = JSON.parse(localStorage.getItem("Token"));
    const url = "http://localhost:8080/laravel8/public/api/user/my-product";

    const config = {
      headers: {
        Authorization: "Bearer " + Token,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };

    useEffect(() => {
      axios
        .get(url, config)
        .then((res) => {
          console.log(res);
          setProducts(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        }); 
    }, []);
    

  function handleDelete (productId)  {
  
    const Durl = "http://localhost:8080/laravel8/public/api/user/product/delete/" + productId;
    console.log(Durl)

    axios
      .get(Durl, config)
      .then((res) => {
        console.log(res);
        
      })
      .catch((error) => {
        console.log(error);
        
      });
  };

    function renderProducts() {
      if (Object.keys(getproducts).length > 0) {
        return Object.keys(getproducts).map((key) => {
          var arr = getproducts[key]["image"];
          let img = JSON.parse(arr);
          return (
            <tr key={key}>
              <td style={{ color: "skyblue" }}>{getproducts[key].id}</td>
              <td style={{ color: "skyblue" }}>{getproducts[key].name}</td>

              <td>
                <img
                  style={{ width: "40px" }}
                  src={
 "http://localhost:8080/laravel8/public/upload/product/" +  getproducts[key].id_user+ "/" + img[0]
                  }
                  alt="Product"
                />
              </td>

              <td>{getproducts[key].price}</td>
              <td>
              <button
                onClick={() => handleDelete(getproducts[key].id)}
                
              >
                Delete
              </button>
              
            </td>
            
              <button
                style={{ marginLeft: "80%" }}
                type="submit"
                className="btn btn-default"
                onClick={() => handleUpdateNew(getproducts[key].id)}
              >
                Update Product
              </button>
            
            </tr>
          );
        });
      }           
      else {
        return (
          <tr>
            <td colSpan="3">No products found</td>
          </tr>
        );
      }
    }
  // viet ham onclick roi targer vao id roi gui qua api
    return (
      <div className="col-sm-4">
        <table>
          <thead style={{ background: "orange", height: "50px", color: "white" }}>
            <tr>
              <th style={{ paddingRight: "125px" }}>ID</th>
              <th style={{ paddingRight: "125px" }}>Name</th>
              <th style={{ paddingRight: "125px" }}>Image</th>
              <th style={{ paddingRight: "125px" }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {renderProducts()}
          </tbody>
        </table>
        <div className="signup-form">
          <form action="#" encType="multipart/form-data">
            <button
              style={{ marginLeft: "130%" }}
              type="submit"
              className="btn btn-default"
              onClick={handleAddNew}
            >
              Add New
            </button>
         
          </form>
        </div>
        
      </div>
    );
  }

  export default MyProduct;



  // function renderData() {
  //   if (cartItems.length > 0) {
  //     return cartItems.map((item) => {
  //       var arr = item.image;
  //       let img = JSON.parse(arr);
  //       return (
  //         <table className="table table-condensed" key={item.id}>
  //           <thead>
  //             <tr className="cart_menu">
  //               <td className="image">Item</td>
  //               <td className="description" />
  //               <td className="price">Price</td>
  //               <td className="quantity">Quantity</td>
  //               <td className="total">Total</td>
  //               <td />
  //             </tr>
  //           </thead>
  //           <tbody>
  //             <tr>
  //               <td className="cart_product">
  //                 <a href="#">
  //                   <img
  //                     src={`http://localhost:8080/laravel8/public/upload/product/${item.id_user}/${img[0]}`}
  //                     alt=""
  //                   />
  //                 </a>
  //               </td>
  //               <td className="cart_description">
  //                 <h4>
  //                   <a href="#">Colorblock Scuba</a>
  //                 </h4>
  //                 <p>Web ID: 1089772</p>
  //               </td>
  //               <td className="cart_price">
  //                 <p>$59</p>
  //               </td>
  //               <td className="cart_quantity">
  //                 <div className="cart_quantity_button">
  //                   <a className="cart_quantity_up" href="#">
  //                     +
  //                   </a>
  //                   <input
  //                     className="cart_quantity_input"
  //                     type="text"
  //                     name="quantity"
  //                     defaultValue={1}
  //                     autoComplete="off"
  //                     size={2}
  //                   />
  //                   <a className="cart_quantity_down" href="#">
  //                     -
  //                   </a>
  //                 </div>
  //               </td>
  //               <td className="cart_total">
  //                 <p className="cart_total_price">$59</p>
  //               </td>
  //               <td className="cart_delete">
  //                 <a className="cart_quantity_delete" href="#">
  //                   <i className="fa fa-times" />
  //                 </a>
  //               </td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       );
  //     });
  //   }
  // }