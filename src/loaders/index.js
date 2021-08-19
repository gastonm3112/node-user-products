const ExpressServer = require('./server/expressServer');
const mongooseLoader = require('../loaders/mongoose');
const logger = require('./logger');

module.exports = async () => {

  //Inicio la base de datos
  await mongooseLoader();
  logger.info('Database connected succesfully');

  //Inicio mi servidor
  const server = new ExpressServer();
  logger.info('Express loaded');

  server.listen();

}