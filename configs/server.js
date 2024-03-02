'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';

import usuarioRoutes from '../src/user/user.route.js';
import empresaRoutes from '../src/busines/empresa.route.js';

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.empresaPath = '/api/empresas';
        this.usuarioPath = '/api/usuarios';

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
        this.app.use(this.usuarioPath,usuarioRoutes)
        this.app.use(this.empresaPath, empresaRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor Ejecutandose y escuchando el puerto',this.port)
        });
    }
}

export default Server;