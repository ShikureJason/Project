const Post = require("../models/postModel");

module.exports.getAllPost = async (req, res, next) => {
    try{
        const data = await Post.find({}).populate("auther","username").sort({updatedAt: -1});
        return res.json(data);
        //return res.json("Pass")
    } catch(ex){
        next(ex);
    }
}

module.exports.addPost =  async (req, res, next) => {
    try{
        const { post, auther } = req.body;
        const data = await Post.create({
            auther : auther,
            message : post,
        });
        data.save();
    } catch(ex){
        next(ex);
    }
}

module.exports.getselfPost = async (req, res, next) => {
    try{
        const userid = req.params.id;
        const data = await Post.find({auther:userid}).populate("auther","username").sort({updatedAt: -1});
        return res.json(data);
    } catch(ex){
        next(ex);
    }
}

