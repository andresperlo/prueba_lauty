const express=require('express');
const morgan=require("morgan")
const cors=require("cors")

class Servidor{
    constructor(){
        this.aplicacion=express();
        this.middlewars();
        this.rutas();
    }

    middlewars(){
        this.aplicacion.use(express.json());
        this.aplicacion.use(morgan('dev'));
        this.aplicacion.use(express.urlencoded({extended:true}))
        this.aplicacion.use(cors())
    }

    rutas(){
       this.aplicacion.use(require("../rutas"))
    }

    listen(){
        this.aplicacion.listen(3001,()=>{
            console.log('Servidor conectado al puerto '+ 3001);
        })
    }

}

module.exports=Servidor