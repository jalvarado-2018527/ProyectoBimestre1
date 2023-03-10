const express = require('express')
const cors = require('cors');
const { dbConection } = require('../database/config');
const categoria = require('../controller/categoriaController')
class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths ={
            categoria : "/api/categoria",
            usuario :"/api/usuario",
            producto :"/api/producto",
            auth : '/api/auth',
            buscar : '/api/buscar'
        }

        this.conectarDB();

        this.middlewares();

        this.routes();

    }

    async conectarDB(){
        await dbConection();
    }

    middlewares(){
        //cors
        this.app.use(cors());


        //lECTURA Y PARSEO DEL BODY
        this.app.use( express.json());
        
        //Directorio publico del Proyecto
        this.app.use( express.static('public'));
    
    
    }
    
    routes(){
        this.app.use(this.paths.auth , require('../routes/auth'))
        this.app.use(this.paths.categoria , require('../routes/categoriaRutas'))
        this.app.use(this.paths.usuario , require('../routes/usuarioRutas'))
        this.app.use(this.paths.producto , require('../routes/productoRutas'))
        this.app.use(this.paths.buscar , require('../routes/buscarRutas'))  
    }


    listen() {
        this.app.listen(this.port, () => {
            categoria.defaultCategoria()
            console.log(`Example app listening on port ${this.port}`)

        })
    }
}

module.exports = Server;