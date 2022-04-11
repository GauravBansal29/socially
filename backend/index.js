const express= require('express');
const app= express();
const mongoose= require('mongoose');
const dotenv= require('dotenv');
const helmet=require('helmet');
const morgan=require('morgan');   
const multer=require('multer');
const userRoute= require('./routes/users');
const authRoute= require('./routes/auth');
const postRoute= require('./routes/posts');
const uploadRoute= require('./routes/upload');
const conversationRoute= require('./routes/conversation');
const messageRoute= require('./routes/messages');
const commentRoute= require('./routes/comment');
const notificationRoute= require('./routes/notification')
const path=require('path');
const cors=require('cors');
dotenv.config() ; // for using environment variables --> STUDY




// connecting to MONGO ATLAS
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true, useUnifiedTopology: true}, ()=>{
    console.log("connected to mongo database");
});  
//cors middleware for cross origin sharing with static making of this path for images at frontend
app.use('/assets' ,cors(), express.static(path.join(__dirname ,"public/assets")));

app.use(express.json());  //for req.body
app.use(helmet());
app.use(morgan('common'));  //for knowing the details of the responses including time to load
//ROUTES
app.use('/api/user' , userRoute);   
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/conversation', conversationRoute);
app.use('/api/message',messageRoute);
app.use('/api/comment', commentRoute);
app.use('/api/notification', notificationRoute);
app.get('/', (req,res)=>{
    res.send("welcome ");
})

 
app.listen(8800, '0.0.0.0',()=>{
    console.log("server started");
})