const { Schema, model } = require('mongoose');

const hospitalSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    img: {
        type: String
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{ collection: 'hospitals'});

hospitalSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject(); 
    return object;
})

module.exports = model('Hospital', hospitalSchema);