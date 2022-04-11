
const mongoose= require('mongoose');
const User= require('./User');
const Conversation= require('./Conversation');

const messageSchema= new mongoose.Schema(
    {
        conversationId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:Conversation,
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
 
const Message= new mongoose.model("Message", messageSchema);
module.exports= Message;
