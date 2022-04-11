const router= require('express').Router();
const User= require('../models/User');
const mongoose= require('mongoose');
const Post = require('../models/Posts');
const { contentSecurityPolicy } = require('helmet');

// router.get('/', (req,res)=>{
//     res.send("post page");
// })
//create
router.post('/', async (req, res)=>{
    try{
    const post=  new Post(req.body);
    await post.save();
    return res.status(200).json("Post created");
    }
    catch(err)
    {
        return res.status(500).json("err");
    }

}) 
//update 
router.put('/:id' ,async (req, res)=>{
    try{
        const post= await Post.findById(req.params.id);
        const user= post.userId;
        if(user._id == req.body.userId)
        {
            await post.updateOne({$set: req.body});
            return res.status(200).json("UPDATED");
        }
        else
        {
            return res.status(403).json("YOU CAN UPDATE ONLY YOUR OWN POST");
        }
    }
    catch(err)
    {
       return res.status(500).json("POST NOT FOUND");
    }
})

//delete
router.delete('/:id' ,async (req, res)=>{
    try{
        const post= await Post.findById(req.params.id);
        if(!post) return res.status(500).json("POST NOT FOUND");
        const user= post.userId;
        if(user._id == req.body.userId)
        {
            await post.deleteOne();
            return res.status(200).json("DELETED YOUR POST");
        }
        else
        {
            return res.status(403).json("YOU CAN DELETE ONLY YOUR OWN POST");
        }
    }
    catch(err)
    {
       return res.status(500).json("POST NOT FOUND");
    }

})
// like a post
router.put('/:id/like', async (req, res)=>{
    try{
        const post= await Post.findById(req.params.id);
        const postcreator= post.userId;
        const id = req.body.userId;
        const user = await User.findOne({ _id: id }).select("_id").lean();
        if(!user)
        {
            return res.status(403).json("INVALID USER");
        } 
        console.log(postcreator, id);
        if(post.userId != id)
        {
            if(!post.likes.includes(id))
            {
                await post.updateOne({$addToSet:{likes:id}}); //like id 
                return  res.status(200).json("1");
            }
            else{
                await post.updateOne({$pull:{likes:id}}); //on reclick like removed
               return  res.status(200).json("0");
            }         
        }
        else
        {
           return res.status(403).json("You cant like your own post");
        }
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
})
//get
router.get('/:id', async (req,res)=>{
    try{
        const post= await Post.findById(req.params.id);
        return res.status(200).json(post);
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
})
//get all posts of a users followings
router.get('/timeline/:userId', async (req, res)=>{
    try
    {
        const user= await User.findById(req.params.userId);
        const yourposts= await Post.find({userId: req.params.userId});
        //vo post dedo mujhe jinki userId  
       const friendposts = await Post.find({userId : {$in:user.followings}});
        const posts= [...yourposts, ...friendposts];
        return res.status(200).json(posts);
    }
    catch(err)
    {
        return res.status(500).json(err);
    }

})
//get all posts of a user
router.get('/myposts/:userId' , async(req, res)=>{
    try{
        const yourposts= await Post.find({userId: req.params.userId});
        return res.status(200).json(yourposts);
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
})


module.exports= router;