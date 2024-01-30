const favModel = require("../modelos/favSchema");
const modeloProducto = require("../modelos/productoSchema");

const getFav=async(req,res)=>{
    try {
        const getAllFav= await favModel.find()
        res.status(200).json({mensaje:"favoritos encontrados:",getAllFav})
    } catch (error) {
        console.log(error);
    }
}

const deletefav=async(req,res)=>{
    try {
        const  favProd= await favModel.findOne({_id:req.params.idFav});
        const productFav= await modeloProducto.findOne({_id:req.params.idProduct})

        const deleteNFav=favProd.favoritos.filter((data)=>data._id.toString()!==productFav._id.toString())

        const deleteAFav=favProd.favoritos.filter((data)=>data._id.toString()===productFav._id.toString())

        if (!deleteAFav.length) {
            return res.status(400).json({mensaje:"Id incorrecto"})
        }

         favProd.favoritos=deleteNFav
         await favProd.save()
         res.status(200).json({mensaje:"favorito eliminado:"})

    } catch (error) {
        console.log(error);
    }
}


module.exports={
    getFav,
    deletefav
}