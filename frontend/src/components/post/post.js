import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import PostService from "../../service/PostService";


export default function Post(){
   const [allPost, setAllPost] = useState([]);
   const data = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
   useEffect(()=>{
    PostService.getpost().then(respone =>{
        setAllPost(respone.data)
        //console.log(respone.data);
    });
    //console.log(allPost);
  },[]);

   return (
    <div>
        {allPost.map((allPost) =>{
            const date = new Date(allPost.updatedAt);
            const timestamp = date.getTime();
            var newdate = new Date(timestamp).toLocaleString("th-TH");
            return (
                <div key ={uuidv4()}>
                    <div>Auther: {allPost.auther.username}</div>
                    <div>{allPost.message}</div>
                    <div>PostTime: {newdate}</div>
                    <div>like: {allPost.like}</div>
                    <div>dislike: {allPost.dislike}</div>
                    <div>share: {allPost.share}</div>
                </div>
            );
        })}
    </div>
   );
}