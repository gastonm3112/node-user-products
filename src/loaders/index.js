const ExpressServer = require('./server/expressServer');
const mongooseLoader = require('../loaders/mongoose');

module.exports = async () => {

  //Inicio la base de datos
  await mongooseLoader();
  console.log('Database connected succesfully');

  //Inicio mi servidor
  const server = new ExpressServer();
  console.log('Express loaded');

  server.listen();

}