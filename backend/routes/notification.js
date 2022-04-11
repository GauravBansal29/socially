const router = require("express").Router();
const mongoose=require("mongoose");
const Notification= require('../models/Notification');


// create a new notification
router.post('/', async (req, res)=>{
   const  {senderId, receiverId, type, senderName}= req.body;
   try{
    const newnotification= new Notification({
        senderName:senderName,
        senderId:senderId,
        receiverId:receiverId,
        type:type
        
    });
    await newnotification.save();
    return  res.status(200).json(newnotification);
    }
    catch(err)
    {
      return   res.status(500).json(err);
    }


})

// get all notifications of a user
router.get('/:userId', async(req, res)=>{
     try{
        const userId= req.params.userId;
       const notifications= await Notification.find({receiverId:userId});
       return  res.status(200).json(notifications);
     }
     catch(err)
     {
        return res.status(500).json(err);
     }
})

//delete all notifications of a user
router.delete('/:userId', async(req, res)=>{
    try{
    const userId= req.params.userId;
    await Notification.deleteMany({receiverId:userId});
        return res.status(200).json("deleted");
    }
    catch(err)
    {
        return res.status(500).json(err);
    }   



})

module.exports= router;