const Server = require('./src/configs/server');
require ('dotenv').config();
const server = new Server();
server.listen();