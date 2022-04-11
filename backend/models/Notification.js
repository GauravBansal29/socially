
const mongoose= require('mongoose');
const User= require('./User');

const notificationSchema= new mongoose.Schema(
    {
        senderName:{
            type:String,
            required:true
        },
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:User,
            required:true
        },
        receiverId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:User,
            required:true
        },
        type:{
            type:Number,
            required:true
        }
        
    }
);
 
const Notification= new mongoose.model("Notification", notificationSchema);
module.exports= Notification;
