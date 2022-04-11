const mongoose= require('mongoose');


const UserSchema =new mongoose.Schema({
   username:{
       type:String,
       required:true,
   },
   email:{
       type:String,
       required:true,
       unique:true
   },
   profilePicture:{
       type:String,
       default:""
   },
   coverPicture:{
    type:String,
    default:""
    },
   followers:{
       type:Array,  //array of their object id's
       default:[]
   },
   followings:{
        type:Array,
        default:[]
   },
   isAdmin:{
       type:Boolean,
       default:false
   },
   password:{
    type:String,
    required:true
    },
    description:{
     type:String
    },
    relationship:{
        type:Number,
        enum:[1,2,3],
        default:1
    },
    from:{
        type:String
    },
    city:{
        type:String
    }
},
{timestamps:true}   //for automatically storing created_at and updated_at properties
);

const User= mongoose.model('User', UserSchema);
module.exports=User;