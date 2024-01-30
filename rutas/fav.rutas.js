const express=require("express")
const { getFav, deletefav } = require("../controladores/fav.controladores")
const rutas=express.Router()

rutas.get("/",getFav)

rutas.delete("/:idFav/:idProduct",deletefav)

module.exports=rutas