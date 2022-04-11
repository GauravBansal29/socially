const io=require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000"
    }
}); // 8900 is my port number

let users=[];
//on  connection and takes care of duplication on reloading 
const addUser= (userId, socketId)=>{
    !users.some((obj)=>obj.userId === userId) && users.push({userId, socketId});
}

// disconnection 
const removeUser= (socketId)=>{
    users =users.filter(user=> user.socketId !== socketId);
}

//to get the socket id
const getUser=(getid)=>{
    console.log(getid);
    console.log(users);
    return users.find((user)=>user.userId === getid) ;
}

//FUNCTIONS

io.on("connection", (socket)=>{
    console.log("connection established");
    //take user from react 
    socket.on("addUser", (userid)=>{
       addUser(userid, socket.id);
       io.emit("onlineusers", users);  //send online users from users array 
       
    })
    //send message
    socket.on("sendmessage", ({userid, receiverid, msg})=>{
        
        // i first want to get socketid for the receiver
        console.log("msgsendrequest", userid, receiverid, msg);
        const receiver= getUser(receiverid);
        console.log(receiver);
        receiver && io.to(receiver.socketId).emit("getmessage",{userid,msg});  // it will receive with the get message function

    })
    socket.on("sendnotification", ({username, receiverid,type})=>{
        //console.log("notificationrequest", username, receiverid, type);
        const receiver= getUser(receiverid);
        console.log("receiver",receiver, username, type);
        receiver && io.to(receiver.socketId).emit("getnotification",{username, type});
    })

    //get message will be in react app
    //get all online users
    socket.on("getonline", ()=>{
        console.log(users);
        io.emit("onlineusers" , users);
    })
    //type denotes like / comment types
    socket.on("postnotification", ({userid, creatorid, type})=>{
        const creator= getUser(creatorid);
        creator && io.to(creator.socketId).emit("newnotification", {userid, type });

    })

    //disconnect
    socket.on("disconnect",()=>{
        console.log("user disconnected");
        removeUser(socket.id);
        io.emit("onlineusers", users); 
    })


})