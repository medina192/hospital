
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middlewares/generateToken');
const { googleVerify } = require('../helpers/google_verify');

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






const googleSignIn = async(req, res) => {

    const googleToken = req.body.token;

    try {

        const {name, picture, email} = await googleVerify(googleToken);
        let user;

        const userDb = await User.findOne({email});

        if(!userDb)
        {
            user = new User({
                name, 
                email,
                img: picture,
                google: true,
                password: "@@@"
            });

        }else{
            user = userDb;
            user.google = true;
        }

        await user.save();

        const token = await generateToken( user.id);
    
        res.json({
            hi: 'po',
            token
        });
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: "The google token is invalid"
        });
    }

}

module.exports = {
    login,
    googleSignIn,
}

