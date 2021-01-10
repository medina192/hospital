const jwt = require('jsonwebtoken');


const generateToken = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };
    
        jwt.sign(payload, process.env.JWT_WORD, {
            expiresIn: '12h'
        }, (err, token) => {
    
            if(err){
                console.log(err);
                reject('the token could not be generated');
            }
            else{
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateToken,
}