
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middlewares/generateToken');

const login = async(req, res) => {

    const { email, password } = req.body;


    try{

        // verify email
        const user = await User.findOne({email});

        if(!user)
        {
            return res.status(404).json({
                ok: false,
                message: 'The email is incorrect'
            });
        }

        // verify password
        const validatePassword = bcrypt.compareSync( password, user.password);

        if(!validatePassword)
        {
            return res.status(404).json({
                ok: false,
                message: 'The password is incorrect'
            });
        }

        // generate token
        const token = await generateToken(user.id);

        res.json({
            hi: 'qwe',
            token
        });

    }catch(error){
        res.status(400).json({
            error: 'catch login'
        });
    }
}

module.exports = {
    login
}

