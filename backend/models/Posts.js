const mongoose= require('mongoose');
const User= require('./User');


const postSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    desc:{
        type:String,
        max:500,
    },
    img:{
        type: Array,
    },
    video:{
        type:Array,
    },
    likes:{
        type: Array,
        default:[]
    },
    comments:{
        type: Number,
        default:0
    }
},
{timestamps:true}
)

const Post= mongoose.model('Post', postSchema);

module.exports= Post;