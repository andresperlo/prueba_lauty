const{Schema,model,Types}=require("mongoose")

const carrSchema= new Schema({
    idUsuario:{
        type:Types.ObjectId
    },
    productos:[]
})

const carrModel=model("carr",carrSchema)
module.exports=carrModel;

