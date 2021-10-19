const path = require('path');
const { v4: uuidv4 } = require('uuid');
const AppError = require('../errors/appError');
const { VALIDEXTENSIONS } = require('../constants');


class UploadRepository {

  constructor() { }

  uploadFiles(files, validExtensions = VALIDEXTENSIONS, folder = '') {
    return new Promise((resolve, reject) => {

      const { file } = files;
      const splittedName = file.name.split('.');
      const extension = splittedName[splittedName.length - 1];



      if (!validExtensions.includes(extension)) {
        return reject(new AppError(`Invalid extension, valid extensions: ${validExtensions.join(' - ')}`, 400));
      }

      const tempName = uuidv4() + '.' + extension;
      const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

      file.mv(uploadPath, (err) => {
        if (err) {
          return reject(new AppError('Error on moving file ', 500, err));
        }

        return resolve(tempName);

      })
    })
  };
}


module.exports = UploadRepository;