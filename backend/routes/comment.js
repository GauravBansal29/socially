const router = require("express").Router();
const mongoose=require("mongoose");
const Comment= require("../models/Comment")
const Post= require("../models/Posts")



// create a new comment
router.post('/', async(req, res)=>{
    const {senderId, text, postId} =req.body;
    try{
        const newComment= new Comment({
            senderId: senderId,
            text: text,
            postId: postId,
        });
        await newComment.save();
        await Post.findOneAndUpdate({_id:postId} ,{ $inc: { comments:1 } }, {new: true });
        res.status(200).json(newComment);
    }   
    catch(err)
    {
        res.status(500).json(err);
    }


})

// get all comments on the post
router.get('/:postId', async (req,res)=>{
    try{
        const {postId}= req.params;
        const commentlist= await Comment.find({postId: postId});
        return res.status(200).json(commentlist);
    }
    catch(err)
    {
        return res.status(500).json(err);
    }

})
module.exports= router;