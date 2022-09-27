import React, { useState, useEffect } from 'react';
import NavbarMenu from './navbar.js';
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import PostService from '../service/PostService';

export default function Profile(){
    const [selfPost, setselfPost] = useState();
    const [msg, setMsg] = useState();
    const [post, setPost] = useState();
    const navigate = useNavigate();

    const data = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );

    const onSubmitPost =(e)=>{
        e.preventDefault();
        if(post){
            PostService.create(post, data.user._id);
            //console.log(post);
            /*setPost(undefined);
            setMsg(undefined);*/
            navigate("/")
        }
    }

    useEffect(()=>{
        PostService.getself(data.user._id).then(respone =>{
            setselfPost(respone.data)
            console.log(respone.data);
        });
        //console.log(allPost);
      },[]);

    return(
        <div>
            <NavbarMenu/>
            <div className='container-fluid from-inner'>
                <form className="form" onSubmit={(e) => onSubmitPost(e)}>
                    <input name="Post" type="text" onChange={(e) => setPost(e.target.value)} value={msg} />
                    <button>โพส</button>
                </form>
                <div>
                {selfPost ? selfPost.map((selfPost) =>{
                    const date = new Date(selfPost.updatedAt);
                    const timestamp = date.getTime();
                    var newdate = new Date(timestamp).toLocaleString("th-TH");
                    return (
                        <div key ={uuidv4()}>
                            <div>Auther: {selfPost.auther.username}</div>
                            <div>{selfPost.message}</div>
                            <div>PostTime: {newdate}</div>
                            <div>like: {selfPost.like}</div>
                            <div>dislike: {selfPost.dislike}</div>
                            <div>share: {selfPost.share}</div>
                        </div>
                    );
                }): <div></div>}
                </div>
            </div>
        </div>
    );
}