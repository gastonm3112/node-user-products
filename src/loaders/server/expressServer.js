const express = require('express');
const cors = require('cors');
const config = require('../../config');

class ExpressServer {

  constructor() {
    this.app = express();
    this.port = config.port;
    this.basePathUsers = `${config.api.prefix}/users`;
    this.basePathAuth = `${config.api.prefix}/auth`;

    //middlewares
    this._middlewares();
    //rutas
    this._routes();
    //No se encuentra
    this._notFound();
    //Manejo de errores
    this._errorHandler();
  }

  _middlewares() {
    //CORS
    this.app.use(cors());

    //JSON use
    this.app.use(express.json());
  }

  _routes() {
    this.app.use(`${this.basePathAuth}`, require('../../routes/auth'));
    this.app.use(`${this.basePathUsers}`, require('../../routes/users'));
  }

  _notFound() {
    this.app.use((req, res, next) => {
      const err = new Error('Not found');
      err.code = 404;
      next(err);
    });
  }

  _errorHandler() {
    this.app.use((err, req, res, next) => {
      const code = err.code || 500;

      const body = {
        error: {
          code,
          message: err.message,
          detail: err.data
        }
      }
      res.status(code).json(body);
    });
  }

  listen() {

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    })

  }


}

module.exports = ExpressServer;