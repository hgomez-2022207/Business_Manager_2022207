const express = require('express');
const cors = require('cors');
const { dbConection } = require('../db/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.empresaPath = '/api/empresas';

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConection();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
        
    }

    routes(){
        this.app.use(this.empresaPath, require('../routes/empresa.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor Ejecutandose y escuchando el puerto',this.port)
        });
    }
}

module.exports = Server;