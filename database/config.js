const mongoose = require('mongoose');

const dbConnection = async() => {

    try{
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false,
            useCreateIndex: true
            });

            console.log('db online');

    } catch(error){
        console.log(error);
        throw new Error('error config database');
    }


}

module.exports = {
    dbConnection
}

