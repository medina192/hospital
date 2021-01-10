const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {

    const token = req.header('x-token');
    
    if(!token)
    {
        return res.status(404).json({
            ok: false,
            message: 'there is no token'
        });
    }

    try{
        const { uid } = jwt.verify(token, process.env.JWT_WORD);
        req.uid = uid;
        next();

    }catch(error){
        return res.status(404).json({
            ok: false,
            message: 'Invalid token'
        });
    }

}

module.exports = {
    validateToken
}