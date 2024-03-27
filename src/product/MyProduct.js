import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Update_Product from "./Update_Product";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../actions/action";
function MyProduct() {
  // const [getproducts, setProducts] = useState([]);

  const navigate = useNavigate();
  const handleAddNew = () => {
    navigate("/productaccount");
  };
  const handleUpdateNew = (productId) => {
    navigate(`/updateaccount/${productId}`);
  };

  const dispatch = useDispatch();

  const product = useSelector((state) => state.myproduct.myproduct);
  console.log(product);

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, []);

  // function handleDelete(productId) {
  //   const Durl =
  //     "http://localhost:8080/laravel8/public/api/user/product/delete/" +
  //     productId;
  //   console.log(Durl);

  //   axios
  //     .get(Durl, config)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  function renderProducts() {
    if (Object.keys(product).length > 0) {
      return Object.keys(product).map((key) => {
        var arr = product[key]["image"];
        let img = JSON.parse(arr);
        return (
          <tr key={key}>
            <td style={{ color: "skyblue" }}>{product[key].id}</td>
            <td style={{ color: "skyblue" }}>{product[key].name}</td>

            <td>
              <img
                style={{ width: "40px" }}
                src={
                  "http://localhost:8080/laravel8/public/upload/product/" +
                  product[key].id_user +
                  "/" +
                  img[0]
                }
                alt="Product"
              />
            </td>

            <td>{product[key].price}</td>
            <td>
              <Button
                variant="danger"
                //    onClick={() => handleDelete(getproducts[key].id)}
              >
                Delete
              </Button>{" "}
            </td>
            <td>
              <Button
                variant="info"
                onClick={() => handleUpdateNew(product[key].id)}
              >
                {" "}
                Edit
              </Button>{" "}
            </td>
          </tr>
        );
      });
    } else {
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
        <tbody>{renderProducts()}</tbody>
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
