const multer=require("multer");
const path=require("path");

module.exports=multer({
    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{
        let extension=path.extname(file.originalname);
        if(extension===".jpeg" || extension===".png" || extension===".jpg" || extension===".gif"){
            cb(null,true)
        }else{
            cb(new Error("Formato incorrecto"), false);
        }
    }
})

