const router= require('express').Router();
const mongoose=require('mongoose');
const User= require('../models/User');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

//REGISTER NEW USER
router.post('/register' , async (req, res)=>{
    try{
    let {username, email, password} =req.body;
    console.log("register");
    password = await bcrypt.hash(password, 12);  //hashing with  12 rounds of salt
    const user= new User({username, email , password});  //if fields problem use object destructuring 
    await user.save();
    // let token = jwt.sign({ id: user.id, username: user.username }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token
    //    return res.status(200).json({
    //         sucess: true,
    //         err: null,
    //         token
    //     });
    return res.status(200).json(user);
    
    }
    catch(err)
    {
        return res.status(500).json(err);
    }

})
//LOGIN
router.post('/login', async (req, res)=>{
    try{
        let {email, password} =req.body;
        let  user= await User.findOne({email});
        if(!user) return res.status(401).json("USERNAME OR PASSWORD IS INVALID");
        let valid =await bcrypt.compare(password , user.password); 
        if(!valid) return  res.status(401).json("USERNAME OR PASSWORD IS INVALID");
        console.log(user);
    //     let token = jwt.sign({ id: user.id, username: user.username }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token
    //    return res.status(200).json({
    //         sucess: true,
    //         err: null,
    //         token
    //     });
    return res.status(200).json(user);
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
})

router.get('/', (req,res)=>{
    res.send('this is the auth page');
})
module.exports= router;