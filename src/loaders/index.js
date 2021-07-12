const ExpressServer = require('./server/expressServer');

module.exports = async () => {

  //Inicio mi servidor
  const server = new ExpressServer();
  console.log('Express loaded');

  server.listen();

}