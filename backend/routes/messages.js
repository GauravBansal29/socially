const router = require("express").Router();
const mongoose=require("mongoose");
const Message= require("../models/Message")

//create new message
router.post('/', async (req, res)=>{
    // pass conversationid and userid in body

    try{
        const {conversationId, userId, text} = req.body;
        
        const newmsg= new Message({
            senderId: userId,
            conversationId:conversationId,
            text:text
        });
        await newmsg.save();
        return res.status(200).json(newmsg);
    }
    catch(err)
    {
        return res.status(200).json(err);
    }   

})

// get all messages of a conversation

router.get('/:conversationId', async (req,res)=>{
    try{
        const {conversationId}= req.params;
        const msglist= await Message.find({conversationId:conversationId});
        return res.status(200).json(msglist);
    }
    catch(err)
    {
        return res.status(500).json(err);
    }

})

module.exports= router;