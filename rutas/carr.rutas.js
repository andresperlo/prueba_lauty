const express=require("express")
const { } = require("../controladores/fav.controladores")
const { carrProduct, deleteCarr } = require("../controladores/carr.controladores")
const rutas=express.Router()

rutas.get("/",carrProduct)


rutas.delete("/:idCarr/:idProductCarr",deleteCarr)

module.exports=rutas