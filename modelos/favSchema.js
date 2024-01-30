const{Schema,model,Types}=require("mongoose")

const favSchema= new Schema({
    idUsuario:{
        type:Types.ObjectId
    },
    favoritos:[]
})

const favModel=model("fav",favSchema)
module.exports=favModel;

