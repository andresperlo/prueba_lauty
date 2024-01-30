const modeloProducto=require("../modelos/productoSchema")
const{ validationResult }=require("express-validator");
const cloudinary=require("../helps/cloudinary");
const modeloUsuario = require("../modelos/usuariosSchema");
const carrModel = require("../modelos/carrSchema");
const favModel = require("../modelos/favSchema");

const getProducts= async(req,res)=>{
    try {
        const getAllProducts= await modeloProducto.find()
        res.status(200).json({mensaje:"Productos encontrados:",getAllProducts})
    } catch (error) {
        res.status(500).json({mensaje:"No se encontraron productos",error})
    }
}



const getProductOne= async (req,res)=>{
    try {
        const getAllProductsOne= await modeloProducto.findOne({_id:req.params.id})
        res.status(200).json({mensaje:"Producto encontrado:",getAllProductsOne})
    } catch (error) {
        res.status(500).json({mensaje:"No se encontraron productos",error})
    }
}



const postProducts= async (req,res)=>{
   try {
    const{Nombre,Precio,Marca,Descripcion}=req.body
    if(!Nombre || !Precio || !Marca || !Descripcion) {
        res.status(500).json({mensaje:"Algun campo se encuentra vacio"})
        return
    }
      const err=validationResult(req)
       if (!err.isEmpty()) {
            return res.status(422).json({mensaje:err.array()})
        }
        const searchName= await modeloProducto.findOne({Nombre})
        if (searchName) {
            res.status(500).json({mensaje:"Producto ya existe en la base de datos"})
           }else{
            const imageResult= await cloudinary.uploader.upload(req.file.path)
            const newRockProduct= new modeloProducto({
            ...req.body,
            Imagen:imageResult.secure_url
            })
            await newRockProduct.save()
             res.status(200).json({mensaje:"Producto creado correctamente",newRockProduct})
           }
        }
    catch (error) {
        res.status(500).json({mensaje:"ERROR"})
   }
}

const putProducts= async(req,res)=>{
    try {
        const updateProduct= await modeloProducto.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
        res.status(200).json({mensaje:'Producto actualizado correctamente',updateProduct})
    } catch (error) {
        res.status(500).json({mensaje:"ERROR",error})
    }
}


const deleteProduct= async (req,res)=>{
    try {
        await modeloProducto.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({mensaje:'Producto eliminado correctamente',deleteProduct})
    } catch (error) {
        res.status(500).json({mensaje:"ERROR",error})
    }
}

const carrProduct = async (req, res) => {
    try {
        const searchUser = await modeloUsuario.findOne({_id:req.idUsuario});
        const product = await modeloProducto.findOne({ _id: req.params.idProd });
        const carr = await carrModel.findOne({ _id: req.idCarr });


        if (searchUser.idCarr.toString() === carr._id.toString()) {
            const prodExist = carr.productos.filter((data) => data._id.toString() === product._id.toString());
            if (prodExist.length > 0) {
                return res.status(400).json({ mensaje: "Producto ya se encuentra en el carrito" });
            }
            carr.productos.push(product);
            await carr.save();
            res.status(200).json({ mensaje: "Producto agregado al carrito" });
        } else {
            console.log("ID CARRITO Y/O USUARIO INCORRECTO");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};


const favProduct=async(req,res)=>{
    try {
        const seachUser= await  modeloUsuario.findOne({_id:req.idUsuario})
        const product= await modeloProducto.findOne({_id:req.params.idProd})
        const fav= await favModel.findOne({_id:req.idFav})

        if (seachUser.idFav.toString() === fav._id.toString()) {
                const prodFavExist=fav.favoritos.filter((data)=>data._id.toString()===product._id.toString())
                if (prodFavExist.length>0) {
                  return res.status(400).json({mensaje:"Producto ya se encuentra en favoritos"})
                }
            fav.favoritos.push(product)
            await fav.save()
            res.status(200).json({ mensaje: "Producto agregado a fav" });
        }else{
            console.log("ID CARRITO Y/O USUARIO INCORRECTO");
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}


module.exports={
    getProducts,
    getProductOne,
    postProducts,
    putProducts,
    carrProduct,
    favProduct,
    deleteProduct
}