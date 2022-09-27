import axios from "axios";
import { addPost, getAllPost, getselfPost } from "./API";

class PostService{
    create(post, auther){
        return axios.post(addPost,{
            post,
            auther,
        })
    }
    async getpost(){
        const data = await axios.get(getAllPost);
        //console.log(data);
        return data;
    }
    async getself(id){
        const data = await axios.get(`${getselfPost}${id}`);
        return data;
    }
}

export default new PostService();