
//  /api/login

const { Router } =require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateField'); 

const router = Router();

router.post('/',[
    check('name','The name is obligatory').not().isEmpty(),
    check('password','The password is obligatory').not().isEmpty(),
    validateFields,
    ], login);

module.exports = router;    


