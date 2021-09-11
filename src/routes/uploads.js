const { Router } = require('express');
const {
  uploadFile,
  updateImage } = require('../controllers/uploads');
const {
  postUploadsValidations,
  putUploadsValidations,
} = require('../middlewares/uploadsValidators');

const router = new Router();


router.post('/', uploadFile);

router.put('/:collection/:id', putUploadsValidations, updateImage);



module.exports = router;