
const Doctor = require('../models/doctors');
const Hospital = require('../models/hospital');
const User = require('../models/user');

const fs = require('fs');

const deletePath = (oldPath) => {

    if(fs.existsSync(oldPath))  // return true if the path exists
    {
        fs.unlinkSync(oldPath);     // remove the path
    }
} 

const updateImage = async(type, id, fileName) => {

    let oldPath = '';

    switch (type) {
        case 'doctors':
            const doctor = await Doctor.findById(id);
            if(!doctor)
            {
                console.log('there isn´t a doctor by id');
                return false;
            }
             
            oldPath = `./uploadFiles/doctors/${doctor.img}`;

            deletePath(oldPath);

            doctor.img = fileName;
            await doctor.save();
            return true;
        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if(!hospital)
            {
                console.log('there isn´t a hospital by id');
                return false;
            }

            oldPath = `./uploadFiles/hospitals/${hospital.img}`;
    
            deletePath(oldPath);
                
            hospital.img = fileName;
            await hospital.save();
            return true;
        case 'users':
            const user = await User.findById(id);
            if(!user)
            {
                console.log('there isn´t a user by id');
                return false;
            }
            
            oldPath = `./uploadFiles/users/${user.img}`;
        
            deletePath(oldPath);
                    
            user.img = fileName;
            await user.save();
            return true;                
        default:
            break;
    }

}

module.exports = {
    updateImage,
}