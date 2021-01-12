

// /api/hospitals

const { Router } =require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateField');
const { validateToken } = require('../middlewares/validateToken');
const {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals,
} = require('../controllers/hospitals');

const router = Router();




router.get('/',  getHospitals );

router.post('/', [
    validateToken,
    check('name','the hospital name is neccesary').not().isEmpty(),
    validateFields
], createHospitals );

router.put('/:id', [

], updateHospitals );

router.delete('/:id', deleteHospitals);

module.exports = router;