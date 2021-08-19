const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const config = require('../../config');
const logger = require('../logger');

class ExpressServer {

  constructor() {
    this.app = express();
    this.port = config.port;
    this.paths = {
      auth: `${config.api.prefix}/auth`,
      categories: `${config.api.prefix}/categories`,
      users: `${config.api.prefix}/users`
    };

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

    this.app.use(morgan('tiny'));

    this.app.use(express.static('src/public'));
  }

  _routes() {

    this.app.use(this.paths.auth, require('../../routes/auth'));
    this.app.use(this.paths.categories, require('../../routes/categories'));
    this.app.use(this.paths.users, require('../../routes/users'));
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

      logger.error(
        `${code} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      )
      logger.error(err.stack);

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
      logger.info(`
      ###################################
      Server running on port ${this.port}
      ###################################`);
    })

  }


}

module.exports = ExpressServer;