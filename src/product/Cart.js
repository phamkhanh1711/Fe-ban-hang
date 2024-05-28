import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

function Cart(props)
{
  const user  = useContext(UserContext)
  console.log(user);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    let kk = localStorage.getItem("khanh");
    if (kk) {
      kk = JSON.parse(kk);
      console.log(kk);
    
    }

    axios
      .post("http://localhost:8081/laravel8/public/api/product/cart", kk)
      .then((res) => {
        console.log(res);
        setCartItems(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  

function handleIncrement(e) {
 
  let getId = e.target.id
   console.log(getId)

  let xx = [...cartItems]
  
 console.log(xx);
    xx.map((value, key) => {
       console.log(value.id)
       console.log(getId)
    if (value.id == getId) { 
       console.log(cartItems[key]['qty'])
      xx[key]['qty'] += 1;   
    } 
    setCartItems(xx);
  });
   const quantityValues = xx.reduce((result, item) => {
     result[item.id] = item.qty;
     return result;
   }, {});
   console.log(quantityValues);
  const tongqty = Object.values(quantityValues).reduce(
   (total, qty) => total + qty,
   0
   );
   user.loginContext(tongqty);


  localStorage.setItem("khanh", JSON.stringify(quantityValues));
 
  }

  
  function handleDecrement(e) {
    let getID = e.target.id;
    console.log(getID);
    let zz = [...cartItems];
    zz.map((value, key) => {
      if (value.id == getID && value.qty > 0) {
       
          zz[key]['qty'] -= 1;
        
      }
      
    });
    console.log(zz)
    setCartItems(zz);
    const quantityValues = zz.reduce((result, item) => {
      result[item.id] = item.qty;
      return result;
    }, {});
    console.log(quantityValues);
    const tongqty = Object.values(quantityValues).reduce(
      (total, qty) => total + qty,
      0
    );
    user.loginContext(tongqty);

 
    localStorage.setItem("khanh", JSON.stringify(quantityValues));
  
  }
  


function totalAmount(cartItems) {
  return cartItems.reduce((total, item) => {
    return total + item.qty * item.price;
  }, 0);
}

function AlltotalAmount(cartItems) {
  return cartItems.reduce((total, item) => {
    return total + item.qty * item.price;
  }, 0);
}
function handleDelete(item) {
  const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
  setCartItems(updatedCartItems);
  const quantityValues = updatedCartItems.reduce((result, item) => {
    result[item.id] = item.qty;
    return result;
  }, {});

  localStorage.setItem("khanh", JSON.stringify(quantityValues));
}
  function renderData() {
    if (Object.keys(cartItems).length > 0) {
      return Object.values(cartItems).map((item) => {
        var arr = item["image"];
        let img = JSON.parse(arr);
        return (
          <table className="table table-condensed" key={item.id}>
            <thead>
              <tr className="cart_menu">
                <td className="image">Item</td>
                <td className="description" />
                <td className="price">Price</td>
                <td className="quantity">Quantity</td>
                <td className="total">Total</td>
                <td />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="cart_product">
                  <a href>
                    <img style={{ width: "200px" }}
                      src={
                        "http://localhost:8081/laravel8/public/upload/product/" +
                        item.id_user +
                        "/" +
                        img[0]
                      }
                    />
                  </a>
                </td>
                <td className="cart_description">
                  <h4>
                    <a href>{item.name}</a>
                  </h4>
                  <p>{item.web_id}</p>
                </td>
                <td className="cart_price">
                  <p>{item.price}</p>
                </td>
                <td className="cart_quantity">
                  <div className="cart_quantity_button">
                    <a onClick={handleIncrement} className="cart_quantity_up" id={item.id}>
                      +
                    </a>
                    <input
                      className="cart_quantity_input"
                      type="text"
                      name="quantity"
                      value={item.qty}
                      autoComplete="off"
                      size={2}
                      
                    />
                    <a onClick={ handleDecrement} className="cart_quantity_down" id={item.id}>
                      -
                    </a>
                  </div>
                </td>
                <td className="cart_total">
  <p className="cart_total_price">${item.qty * item.price}</p>
</td>
<td className="cart_delete">
  <a className="cart_quantity_delete" onClick={() => handleDelete(item)} href>
    <i className="fa fa-times" />
  </a>
</td>
              </tr>
            </tbody>
          </table>
        );
      });
    } 
  }
  
  

    return(
      <div>
         
         <div className="table-responsive cart_info">
          {renderData()}
          
      </div>
      <p>Tổng tổng cộng của các mặt hàng: ${AlltotalAmount(cartItems)}</p>
      </div>
       
    )
}
export default Cart;