
const Doctor = require('../models/doctors');
const Hospital = require('../models/hospital');

const getDoctors = async(req, res) => {

    const doctors = await Doctor.find({})
                            .populate('user','name')
                            .populate('hospital','name');

    res.json({
        message: 'get doctors',
        doctors
    })
}

const createDoctors = async(req, res) => {

    const uidUser = req.uid;
    

    const doctor = new Doctor({
        user: uidUser,
        ...req.body,
    });


    try {

        const doctorDb = await doctor.save();

        res.json({
            message: 'create Doctors',
            doctorDb
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'talk to the administrator',
            ubication: 'create Doctors',

        });
    }
}

const updateDoctors = (req, res) => {

    res.json({
        message: 'update Doctors'
    })
}

const deleteDoctors = (req, res) => {

    res.json({
        message: 'delete Doctors'
    })
}

module.exports = {
    getDoctors,
    createDoctors,
    updateDoctors,
    deleteDoctors,
}