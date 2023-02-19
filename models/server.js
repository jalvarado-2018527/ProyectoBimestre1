const express = require('express')
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.categoriaPath = "/api/categorias";
        this.usuarioPath = "/api/usuario";
        this.productoPath ="/api/producto";
        this.authPath = '/api/auth';

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
        this.app.use(this.authPath , require('../routes/auth'))
        this.app.use(this.categoriaPath , require('../routes/categoriaRutas'))
        this.app.use(this.usuarioPath , require('../routes/usuarioRutas'))
        this.app.use(this.productoPath , require('../routes/productoRutas'))
        
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}

module.exports = Server;