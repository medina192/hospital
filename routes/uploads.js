
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const {
    fileUpload,
    returnImage,
} = require('../controllers/uploads');
const { validateToken } = require('../middlewares/validateToken');

const router = Router();

router.use( expressFileUpload());

router.put('/:type/:id', validateToken, fileUpload);

router.get('/:type/:picture', validateToken, returnImage);

module.exports = router;