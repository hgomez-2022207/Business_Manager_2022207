'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';

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
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        
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

export default Server;