const mongoose= require('mongoose');

const conversationSchema= new mongoose.Schema(
    {
        members:{
            type:Array
        },
        chatPreview:{
            type:String,
            default:""
        }
    },
    {timestamps:true}
);
 
const Conversation= new mongoose.model("Conversation", conversationSchema);
module.exports= Conversation;
