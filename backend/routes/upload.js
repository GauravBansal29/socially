const router=require('express').Router();
const multer=require('multer');

const path=require('path');


let imgfilenames=new Array();
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/assets/uploads');
    },
    filename: (req, file, cb)=>{
        let a= Date.now() + file.fieldname + file.originalname;
        cb(null, a);
        filenames.push(a);
    },
})
const upload=multer({storage:storage});

const uploadschema= upload.fields([{name:'photofiles' , maxCount:3} , {name:'videofiles', maxCount:3}])
function clearfile(req, res, next) 
{
    filenames=[]; 
    next();
}
router.post('/',clearfile, uploadschema, (req,res)=>{
    try{
        return res.status(200).json(filenames)
        
    }
    catch(err){
        console.log(err);
    }
})

module.exports =router;