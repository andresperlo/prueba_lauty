const{ validationResult }=require("express-validator");

const resultVerify=(req)=>{
    const err=validationResult(req)
    return err
}
module.exports=resultVerify