
const mongoose= require('mongoose');
const Post = require('./Posts');
const User= require('./User');

const commentSchema= new mongoose.Schema(
    {
        postId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:Post,
            required:true
        },
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:User,
            required:true
        },
        text:{
            type:String,
            required:true
        }
        
    },
    {timestamps:true}
);
 
const Comment= new mongoose.model("Comment", commentSchema);
module.exports= Comment;
