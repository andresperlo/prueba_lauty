const express=require("express")
const multer=require("../middelworlds/multer")
const rutas=express.Router()
const{getProducts,getProductOne,postProducts,putProducts,deleteProduct,carrProduct,favProduct}=require("../controladores/productos.controladores")
const{check}=require("express-validator")
const auth = require("../middelworlds/auth")

rutas.get("/",getProducts)

rutas.get("/:id",getProductOne)

rutas.post("/",multer.single('Imagen'),postProducts)

rutas.post("/cart/:idProd",auth('user'),carrProduct)

rutas.post("/fav/:idProd",auth('user'),favProduct)

rutas.put("/:id",putProducts)

rutas.delete("/:id",deleteProduct)

module.exports=rutas