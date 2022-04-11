//user-route 
const router= require("express").Router();
const bcrypt= require("bcrypt");

const User= require('../models/User');
//update ,delete,get,  follow , unfollow

//GET USER
router.get('/:id' ,async (req, res)=>{
    try
    {
        const id= req.params.id;
        const user = await User.findById(id);
        return res.status(200).json(user);  //dont return all information --IMPORTANT
    }
    catch(err)
    {
        console.log(err);
       return  res.status(500).json(err);
    }
})



//UPDATE REQUEST through req.body
router.put('/:id', async(req, res)=>{  
    if(req.body.userId == req.params.id || req.body.isAdmin)  //_id or userid 
    {
        if(req.body.password)
        {  //hashing the provided password 
            try{
            req.body.password= await bcrypt.hash(req.body.password, 12);
            
            }
            catch(e){
                console.log("password eror");
              return res.status(500).json(e);
            }
        }
        try{
            const user= await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json("ACCOUNT UPDATED");
        }
        catch(err)
        {
             return res.status(500).json("COULDNT PROCESS UPDATE");
        }
        
    }
    else
    {
        return res.status(401).json("YOU CAN UPDATE YOUR OWN ACCOUNT ONLY");
    }
})
//DELETE USER --> passing userId in req.body
router.delete('/:id', async(req, res)=>{  
    if(req.body.userId == req.params.id || req.body.isAdmin)  //_id or userid 
    {
        try{
            let user= User.findById(req.body.userId);
            if(!user) {console.log("no such user");}
            console.log(user);
            await User.findOneAndDelete({_id:req.body.userId});
            res.status(200).json("ACCOUNT DELETED");
        }
        catch(err)
        {
             return res.status(500).json("COULDNT PROCESS DELETE");
        }
        
    }
    else
    {
        return res.status(401).json("YOU CAN DELETE ONLY YOUR OWN ACCOUNT");
    }
})

// FOLLOW A USER 

router.put('/:id/follow', async (req,res)=>{

    // res.body contains who send the data
    try{
        const userid= req.body._id;
        const friendid= req.params.id;
        if(userid !== friendid)
        {
            const user= await User.findById(userid);
            const friend= await User.findById(friendid);
            console.log(userid, friendid);
            const contain= friend.followers.includes(userid);
            if(!contain)
            {
                const user= await User.findByIdAndUpdate(userid, {$addToSet:{
                    followings:friendid
                }})
                const friend= await User.findByIdAndUpdate(friendid, {$addToSet:{
                    followers:userid
                }})
            }
            else{
                  return res.status(403).json("You already follow this user");
            }
            return res.status(200).json("Followed");
        }
        else{
            
           return  res.status(403).json("You cant follow yourself");
        }
      }
    catch(err){
        
        return res.status(500).json(err);
    }

})

//UNFOLLOW 
router.put('/:id/unfollow', async (req, res)=>{
    try{
        const userid= req.body._id;
        const friendid= req.params.id;
            if(userid !== friendid)
            {
                const user= await User.findById(userid);
                const friend= await User.findById(friendid);
               if( friend.followers.includes(userid))
               {
                    console.log(userid, friendid);
                    const user= await User.findByIdAndUpdate(userid, {$pull:{
                        followings:friendid
                    }})
                    const friend= await User.findByIdAndUpdate(friendid, {$pull:{
                        followers:userid
                    }})
                    return res.status(200).json("Unfollowed");
                }
                else 
                {
                   return res.status(403).json("You dont follow this user");
                }
            }
            else
            {
               return  res.status(403).json("You cant unfollow yourself");
            }
        }
        catch(err){
            
            return res.status(500).json(err);
        }
    
})
// get all friends of user
router.get('/:id/friends' , async (req, res)=>{
    const id= req.params.id;
    try{
        const user= await User.findById(id);
        const friends= new Array();
        for(let friendid of user.followings)
        {
            const x= await User.findById(friendid);
            friends.push(
            { 
                userid: x._id,
                username:x.username,
                profilePicture:x.profilePicture
            });
        }
        res.status(200).json(friends);
    }
    catch(err)
    {
        res.status(500).json(err);
    }

})
//get all users for the searchbar
router.get('/', async(req,res)=>{
    try{
    const userlist =await User.find({});
     const mydata= userlist.map((item)=>{
           const {_id, username, profilePicture}= item;
           return {_id,  username , profilePicture};
     });
     res.status(200).json(mydata);

    }
    catch(err)
    {
        res.status(500).json(err);
    }


})
module.exports= router;
