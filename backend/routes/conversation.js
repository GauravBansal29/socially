const router = require("express").Router();
const mongoose=require("mongoose");
const Conversation= require("../models/Conversation");

//create new  conversation
router.post('/', async (req, res)=>{
    // body will contain the current user who is making the room
    try{
        const conv= await Conversation.findOne({members:[req.body.senderId , req.body.receiverId]});
        if(conv) return res.status(200).json(conv);
        const retry= await Conversation.findOne({members:[req.body.receiverId, req.body.senderId]});
        if(retry) return res.status(200).json(retry);
    }
    catch(err)
    {
        console.log(err);
    }
    try{
         const newconv = await new Conversation({members:[req.body.senderId , req.body.receiverId]});
          await newconv.save();
          return res.status(200).json(newconv);
        }
    catch(err)
        {
             return res.status(500).json(err);
        } 
   
})



//get a user's all conversations
router.get('/:userId', async (req, res)=>{
    try{
        const {userId}=  req.params;
        const convlist= await Conversation.find({
            members:{$in:[userId]}
        });
      return  res.status(200).json(convlist);
    }
    catch(err)
    {
       return  res.status(500).json(err);
    }
})

//get a conversation by id
router.get('/cid/:conversationId', async(req, res)=>{
    try{
    const myconv= await Conversation.findById(req.params.conversationId);
    return res.status(200).json(myconv);
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
})


module.exports= router;