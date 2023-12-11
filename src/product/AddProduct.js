import { useState } from "react";
import CheckError from "../member/CheckError";
import axios from "axios";
import { useEffect } from "react";

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
    avatar:"",
    sale: 0
  });
  useEffect(() => {
    axios
      .get("http://localhost:8080/laravel8/public/api/category-brand")
      .then(res => {
        console.log(res);
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
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
    
      let Token = JSON.parse(localStorage.getItem("Token"));
      let url = "http://localhost:8080/laravel8/public/api/user/product/add"
      console.log(url)

      let config = {
        headers: {
         'Authorization': "Bearer " + Token,
          "Content-Type": "multipart/form-data",
          'Accept': "application/json"
        }
       
      };
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
      


      axios.post(url, formData, config)
        .then((response) => {
          console.log(response);
          alert("Create product! Thành công");
        })
        .catch((error) => {
          console.log(error);
          alert("Create product! Thất bại");
        });
    }
  }
    return (
        <div className="col-sm-4">
        <div className="signup-form">
          <h2>Creat product!</h2>
          <form action="#" onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="text" placeholder="Name...." name="username" onChange={handleInput} value={user.username} />
            <input type="text" placeholder="Price...." name="price" onChange={handleInput} value={user.price}  />
           
          <select defaultValue="" name="category" onChange={handleInput} value={user.category}>
              <option value="" disabled hidden>Please choose Category ....</option>
              {getData.brand && getData.category.map(category => (
              <option key={category.id} value={category.id}>{category.category}</option>
               ))}
          </select>

          <select placeholder="Please choose Brand ...." name="brand" onChange={handleInput} value={user.brand}>
              <option value="" disabled hidden>Please choose Brand ....</option>
              {getData.brand && getData.brand.map(brand => (
              <option key={brand.id} value={brand.id}>{brand.brand}</option>
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
            <input type="text" placeholder="Company profile...."onChange={handleInput} name="company"  value={user.company}/>
          
            <input type="file" name="avatar"  onChange={hanldeFile} />
            <textarea
                name="detail"
                rows={11}
                defaultValue={""}
                placeholder="Detail...."
                onChange={handleInput}
                value={user.detail}
              />
            <button type="submit" className="btn btn-default">Signup</button>
          </form>
          <CheckError errors = {errors}/>
        </div>
      </div>
        )
}
export default AddProduct;

// <div className="col-sm-4">
// <div className="signup-form">
//   <h2>CREATE BOOK</h2>
//   <form action="/add_book" method="POST" encType="multipart/form-data">
//     <label htmlFor="bookTitle">Title:</label>
//     <input
//       type="text"
//       id="bookTitle"
//       name="bookTitle"
//       onChange={handleInput}
//       value={user.bookTitle}
//     />
//     <br />
//     <label htmlFor="author">Author:</label>
//     <input
//       type="text"
//       id="author"
//       name="author"
//       onChange={handleInput}
//       value={user.author}
//     />
//     <br />
//     <label htmlFor="publicationYear">Publication Year:</label>
//     <input
//       type="date"
//       id="publicationYear"
//       name="publicationYear"
//       onChange={handleInput}
//       value={user.publicationYear}
//     />
//     <br />
//     <label htmlFor="price">Price:</label>
//     <input
//       type="number"
//       id="price"
//       name="price"
//       step="0.01"
//       min="0"
//       max="1000"
//       onChange={handleInput}
//       value={user.price}
//     />
//     <br />
//     <label htmlFor="category">Category:</label>
//     <select
//       id="category"
//       name="category"
//       onChange={handleInput}
//       value={user.category}
//     >
//       <option value="default">Chọn thể loại</option>
//       {renderCategory()}
//     </select>
//     <br />
//     <label htmlFor="newCategory">New Category:</label>
//     <input
//       type="text"
//       id="newCategory"
//       name="newCategory"
//       onChange={handleInput}
//       value={user.newCategory}
//     />
//     <br />
//     <br />

//     <h3>Upload File and Image</h3>

//     <div className="form-group">
//       <label htmlFor="fileElem">Select File:</label>
//       <input
//         type="file"
//         className="fileElem"
//         name="fileElem"
//         id="fileElem"
//         onChange={hanldeFile}
//       />
//     </div>

//     <div className="form-group">
//       <label htmlFor="myImage">Select Image:</label>
//       <input
//         type="file"
//         className="fileElem"
//         name="myImage"
//         id="myImage"
//       />
//     </div>

//     <button type="submit">Add Book</button>
//   </form>
// </div>
// </div>