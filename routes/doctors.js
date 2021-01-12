
//      /api/doctors

const { Router } =require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateField');
const { validateToken } = require('../middlewares/validateToken');

const {
    getDoctors,
    createDoctors,
    updateDoctors,
    deleteDoctors,
} = require('../controllers/doctors');

const router = Router();



router.get('/',  getDoctors );

router.post('/', [
    validateToken,
    check('name', 'the name is obligatory').not().isEmpty(),
    check('hospital','the hospital must be a mongoId').isMongoId(),
    validateFields
], createDoctors );

router.put('/:id', [

], updateDoctors );

router.delete('/:id', deleteDoctors);

module.exports = router;