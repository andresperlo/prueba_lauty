require('dotenv').config()
require("./baseDeDatos/base")
const Servidor=require('./server/aplicacion')
const server= new Servidor
server.listen()