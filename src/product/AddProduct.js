import { useState } from "react";
import CheckError from "../member/CheckError";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddProduct, fetchAllBrand } from "../actions/action";
import Button from "react-bootstrap/Button";
function AddProduct(props) {
  const [getData, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [getFile, setFile] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [user, setUser] = useState({
    username: "",
    price: "",
    category: "",
    brand: "",
    company: "",
    detail: "",
    status: "",
    avatar: "",
    sale: 0,
  });

  const dispatch = useDispatch();

  const addproduct = useSelector((state) => state.addproduct.addproduct);

  const brand = useSelector((state) => state.category.brand);

  useEffect(() => {
    dispatch(fetchAllBrand());
  }, []);

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

    if (user.username === "") {
      errorsSubmit.name = "Vui Lòng Nhập Name";
      flag = false;
    }
    if (user.price === "") {
      errorsSubmit.price = "Vui Lòng Nhập Price";
      flag = false;
    }
    if (user.category === "") {
      errorsSubmit.category = "Vui Lòng Nhập category ";
      flag = false;
    }
    if (user.brand === "") {
      errorsSubmit.brand = "Vui Lòng Nhập brand";
      flag = false;
    }
    if (user.status === "") {
      errorsSubmit.status = "Vui Lòng Nhập status ";
      flag = false;
    }
    if (user.sale === "") {
      errorsSubmit.sale = "Vui Lòng Nhập sale ";
      flag = false;
    }
    if (user.company === "") {
      errorsSubmit.company = "Vui Lòng Nhập company ";
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
        errorsSubmit.avatar = "Chỉ được upload file 'png', 'jpg', 'jpeg'";
        setFile([]);
        flag = false;
      } else if (size > 1024 * 1024) {
        errorsSubmit.avatar = "File quá lớn (tối đa 1MB)";
        flag = false;
      }
    }
    if (user.detail === "") {
      errorsSubmit.detail = "Vui Lòng Nhập detail ";
      flag = false;
    }

    if (!flag) {
      setErrors(errorsSubmit);
      alert("Create product! Thất bại");
    } else {
      setErrors({});
      let formData = new FormData();
      formData.append("name", user.username);
      formData.append("price", user.price);
      formData.append("brand", user.brand);
      formData.append("category", user.category);
      formData.append("company", user.company);
      formData.append("detail", user.detail);
      formData.append("status", user.status);
      formData.append("sale", user.sale);

      Object.keys(getFile).map((item, i) => {
        formData.append("file[]", getFile[item]);
      });
      dispatch(fetchAddProduct(formData));
    }
  }
  return (
    <div className="col-sm-4">
      <div className="signup-form">
        <h2>Creat product!</h2>
        <form action="#" onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Name...."
            name="username"
            onChange={handleInput}
            value={user.username}
          />
          <input
            type="text"
            placeholder="Price...."
            name="price"
            onChange={handleInput}
            value={user.price}
          />
          <select
            defaultValue=""
            name="category"
            onChange={handleInput}
            value={user.category}
          >
            <option value="" disabled hidden>
              Please choose Category ....
            </option>
            {brand.brand &&
              brand.category.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category}
                </option>
              ))}
          </select>
          <select
            placeholder="Please choose Brand ...."
            name="brand"
            onChange={handleInput}
            value={user.brand}
          >
            <option value="" disabled hidden>
              Please choose Brand ....
            </option>
            {brand.brand &&
              brand.brand.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.brand}
                </option>
              ))}
          </select>
          <select
            placeholder="Please choose status ...."
            name="status"
            onChange={handleInput}
            value={user.status}
          >
            <option value={0}>New</option>
            <option value={1}>Sale</option>
          </select>
          {user.status === "1" && (
            <input
              type="text"
              placeholder="Sale price...."
              name="sale"
              onChange={handleInput}
              value={user.sale}
            />
          )}
          <input
            type="text"
            placeholder="Company profile...."
            onChange={handleInput}
            name="company"
            value={user.company}
          />
          <input type="file" name="avatar" onChange={hanldeFile} />
          <textarea
            name="detail"
            rows={11}
            defaultValue={""}
            placeholder="Detail...."
            onChange={handleInput}
            value={user.detail}
          />
          <Button as="input" type="submit" value="Submit" />
        </form>
        <CheckError errors={errors} />
      </div>
    </div>
  );
}
export default AddProduct;
