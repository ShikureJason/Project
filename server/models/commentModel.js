const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        post:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        auther:{
            text: { type: String, required: true },
        },
        message: {
            text: { type: String, required: true },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Comment", CommentSchema);
