import React, { useState, useEffect } from 'react';
import NavbarMenu from './navbar.js';
import { Link, useNavigate } from "react-router-dom";
import PostService from '../service/PostService.js';
import Post from './post/post.js';

export default function Index() {

  const [post, setPost] = useState("");
  const navigate = useNavigate();
 
  const data = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  );

  const onSubmitPost =(e)=>{
    e.preventDefault();
    if(post){
      PostService.create(post, data.user._id);
      //console.log(post);
      setPost("");
      //navigate("/")
    }
  }
  return (
    <div>
      <NavbarMenu/>
      <div className='container-fluid from-inner'>
        <form className="form" onSubmit={(e) => onSubmitPost(e)}>
          <input name="Post" type="text" onChange={(e) => setPost(e.target.value)} value={post} />
          <button>โพส</button>
        </form>
        <div>
          <Post/>
        </div>
      </div>
    </div>
  )
}