const User = require('../models/user');
const bcrypt = require('bcryptjs');
const router = require('../routes/users');
const { generateToken } = require('../middlewares/generateToken');

const getUsers = async (req, res) => {

    let users = {};

    try{
         users = await User.find({});
        console.log('well');
        res.json({
            users,
            uid: req.uid
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: 'false',
            message: 'unexpected error'
        });
    }



}



const createUser = async (req, res) => {

    const { name, email, password } = req.body;

    const user = new User( req.body);

    try{
        const emailExists = await User.findOne({email});

        if(emailExists)
        {
            return res.status(500).json({
                message: 'The email already exists'
            })
        }

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        // generate token
        const token = await generateToken(user.id);


        console.log('well');
        
        res.json({
            user,
            token
        });

    } catch(error){
        console.log(error);
    }

}


const updateUser = async(req, res) => {

    const uid = req.params.id;

    try{

        const userDb = await User.findById(uid);

        if(!userDb)
        {
            return res.status(404).json({
                message: 'The user does not exist'
            });
        }

        const {password, google, email, ...fields} = req.body;

        if(req.body.email !== email)
        {
            const emailExists = await User.findOne({email});
            if(emailExists)
            {
                return res.status(400).json({
                    message: 'The email already exists'
                });
            }
        }

        fields.email = email;
        const updatedUser = await User.findByIdAndUpdate(uid, fields, {new: true});

        res.json({
            updatedUser
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: 'Unexpected error'
        });
    }
}

const deleteUser = async(req, res) => {
    
    const uid = req.params.id;

    try{

        const userDb = await User.findById(uid);

        console.log(userDb);

        if(!userDb)
        {
            return res.status(404).json({
                message: 'The user does not exist'
            });
        }

        await User.findByIdAndDelete(uid);

        res.json({
            message: 'The user was deleted' 
        });

    }catch(error){

        return res.status(400).json({
            message: 'Error delete'
        });
    }


}


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}

