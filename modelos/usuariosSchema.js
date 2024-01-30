const {Schema,model, Types}=require("mongoose")
const usuariosSchema= new Schema({
    Nombre:{
        type:String,
        require:true
    },
    Correo:{
        type:String,
        require:true
    },
    Contrasenia:{
        type:String,
        require:true
    },
    Nacionalidad:{
        type:String,
        require:true
    },
    Role:{
        type:String,
        default:"user"
    },
    idCarr:{
      type:Types.ObjectId
    },
    idFav:{
        type:Types.ObjectId
    }

})

usuariosSchema.methods.toJSON=function(){
    const {Contrasenia, ...user}=this.toObject()
    return user
}

const modeloUsuario=model("Usuarios",usuariosSchema)
module.exports=modeloUsuario