import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import ListComment from './ListComment';
import Rate from './Rate';


function Blog_Detail(props) {
  let params = useParams();

  const [getData, setData] = useState([]);
  const [comment , setComment] = useState([]); 
  useEffect(() => {
    axios.get("http://localhost:8080/laravel8/public/api/blog/detail/" + params.id)
      .then(res => {
        console.log(res);
        setData(res.data.data);
        setComment(res.data.data.comment);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [params.id]);

  function fetchData() {
    if (!getData) {
      return null;
    }

    return (
      <div className="single-blog-post">
        <h3>{getData.title}</h3>
        <div className="post-meta">
          <ul>
            <li>
              <i className="fa fa-user" /> Mac Doe
            </li>
            <li>
              <i className="fa fa-clock-o" /> 1:33 pm
            </li>
            <li>
              <i className="fa fa-calendar" /> DEC 5, 2013
            </li>
          </ul>
        </div>
        <a href="#">
        <img src={"http://localhost:8080/laravel8/public/upload/Blog/image/" + getData.image} />
        </a>
        <p>{getData.description}</p>
        <br />
        <p>{getData.content}</p>
        <br />
        <div className="pager-area">
          <ul className="pager pull-right">
            <li>
              <a href="#">Pre</a>
            </li>
            <li>
              <a href="#">Next</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
      </div>
      {fetchData()}
      
      
      <Rate idBlog = {params.id}/>
      <ListComment comments={comment} />
      <Comment idBlog={params.id} />
    </div>
  );
}

export default Blog_Detail;




