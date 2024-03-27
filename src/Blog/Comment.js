import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CheckError from "../member/CheckError";
import axios from "axios";

function Comment(props) {
  const navigate = useNavigate();

  const [textarea, setTextarea] = useState({
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setTextarea((state) => ({ ...state, [nameInput]: value }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;

    if (textarea.message === "") {
      errorsSubmit.message = "Vui lòng nhập bình luận...";
      flag = false;
    }

    if (!flag) {
      setErrors(errorsSubmit);
    } else {
      setErrors({});

      const idBlog = { props };
      console.log(idBlog);

      let Token = JSON.parse(localStorage.getItem("Token"));
      console.log(Token);

      let Auth = JSON.parse(localStorage.getItem("Auth"));
      console.log(Auth);
      let url =
        "http://localhost:8080/laravel8/public/api/blog/comment/" +
        props.idBlog;
      console.log(url);

      let config = {
        headers: {
          Authorization: "Bearer " + Token,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };

      console.log(config);
      if (textarea.message) {
        const formData = new FormData();
        formData.append("id_blog", props.idBlog);
        formData.append("id_user", Auth.id);
        formData.append("name_user", Auth.name);
        formData.append("comment", textarea.message);
        formData.append("id_comment", 0);
        formData.append("image_user", Auth.avatar);

        axios
          .post(url, formData, config)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  function renderLogin() {
    var isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

    if (isLoggedIn) {
      return (
        <button type="submit" className="btn btn-primary">
          Post Comment
        </button>
      );
    } else {
      return (
        <div>
          <button onClick={logout} className="btn btn-primary">
            Post Comment
          </button>
        </div>
      );
    }
  }

  function logout() {
    alert("Vui lòng đăng nhập để viết bình luận");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }

  return (
    <div className="replay-box">
      <div className="row">
        <div className="col-sm-12">
          <h2>Leave a reply</h2>
          <div className="text-area">
            <form onSubmit={handleSubmit}>
              <div className="blank-arrow">
                <label>Your Name</label>
              </div>
              <span>*</span>
              <textarea
                name="message"
                rows={11}
                defaultValue={""}
                onChange={handleInput}
              />
              {renderLogin()}
            </form>
            <CheckError errors={errors} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
