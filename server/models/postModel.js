const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema(
    {
        auther: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        message: {
            type : String,
            required: true,
        },
        isImageSet: {
            type: Boolean,
            default: false,
          },
        image: {
            type: String,
            default: "",
        },
        like:{
            type: Number,
            default: 0,
        },
        dislike:{
            type: Number,
            default: 0,
        },
        share:{
            type: Number,
            default: 0,
        },
        isShare:{
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", PostsSchema);
 