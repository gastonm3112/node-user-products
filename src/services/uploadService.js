const UploadRepository = require('../repositories/uploadsRepository');
const uploadRepository = new UploadRepository();

const uploadFiles = async (files, validExtensions, folder = '') => {
  return await uploadRepository.uploadFiles(files, validExtensions, folder);
}

module.exports = {
  uploadFiles,
}