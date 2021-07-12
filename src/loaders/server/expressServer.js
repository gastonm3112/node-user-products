const express = require('express');
const cors = require('cors');
const config = require('../../config');

class ExpressServer {

  constructor() {
    this.app = express();
    this.port = config.port;
    this.basePathUsers = `${config.api.prefix}/users`;

    //middlewares
    this._middlewares();
    //rutas
    this._routes();
  }

  _middlewares() {
    //CORS
    this.app.use(cors());

    //JSON use
    this.app.use(express.json());
  }

  _routes() {
    this.app.use(`${this.basePathUsers}`, require('../../routes/users'));
  }

  listen() {

    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    })

  }


}

module.exports = ExpressServer;