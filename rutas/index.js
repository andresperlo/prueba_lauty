const express=require("express")
const rutas=express.Router()

const productoRock=require("../rutas/productos.rutas")
const usuariosRock=require("../rutas/usuarios.rutas")
const favRock=require("../rutas/fav.rutas")
const carrRock=require("../rutas/carr.rutas")

rutas.use("/productos",productoRock)
rutas.use("/usuarios",usuariosRock)
rutas.use("/fav",favRock)
rutas.use("/carr",carrRock)

module.exports=rutas