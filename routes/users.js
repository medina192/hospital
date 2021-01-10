const { Router } =require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateField');
const { validateToken } = require('../middlewares/validateToken');

const router = Router();
const { 
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/users');

// /api/users

router.get('/', validateToken, getUsers );

router.post('/', [
    check('name','The name is obligatory').not().isEmpty(),
    check('password','the password is obligatory').not().isEmpty(),
    check('email','the email is invalid').isEmail(),
    validateFields,
], createUser );

router.put('/:id', [
    validateToken,
    check('name','The name is obligatory').not().isEmpty(),
    check('email','the email is invalid').isEmail(),
    check('role','the role is obligatory').not().isEmpty(),
    validateFields,
], updateUser );

router.delete('/:id', validateToken, deleteUser);

module.exports = router;

