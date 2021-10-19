const AppError = require('../../errors/appError');

const allowedCollections = (collection = '', collections = []) => {
  if (!collections.includes(collection)) {
    throw new AppError(`Invalid Collection. Valid Collections are: ${collections.join(' - ')}`, 400);
  }

  return true;
}

module.exports = {
  allowedCollections
}