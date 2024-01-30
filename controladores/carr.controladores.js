const carrModel = require("../modelos/carrSchema");
const modeloProducto = require("../modelos/productoSchema");

const carrProduct=async(req,res)=>{
    try {
        const carrGet= await carrModel.find()
        res.status(200).json({mensaje:"carritos encontrados:",carrGet})

    } catch (error) {
        console.log(error);
    }
}

const deleteCarr=async(req,res)=>{
    try {
        const  carrProd= await carrModel.findOne({_id:req.params.idCarrito});
        const productCarr= await modeloProducto.findOne({_id:req.params.idProductCarr})

        const deleteNFav=carrProd.favoritos.filter((data)=>data._id.toString()!==productCarr._id.toString())

        const deleteAFav=carrProd.favoritos.filter((data)=>data._id.toString()===productCarr._id.toString())

        if (!deleteAFav.length) {
            return res.status(400).json({mensaje:"Id incorrecto"})
        }

         carrProd.favoritos=deleteNFav
         await carrProd.save()
         res.status(200).json({mensaje:"favorito eliminado:"})

    } catch (error) {
        console.log(error);
    }
}

module.exports={
    carrProduct,
    deleteCarr
}