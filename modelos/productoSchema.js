const {Schema,model}=require("mongoose")
const productoModelo= new Schema({
    Nombre:{
        type:String,
        require:true
    },
    Precio:{
        type:Number,
        require:true
    },
    Descripcion:{
        type:String,
        require:true
    },
    Marca:{
        type:String,
        require:true
    },
    Imagen:{
        type:String,
        require:true
    }
})

const modeloProducto=model("Producto",productoModelo);
module.exports=modeloProducto