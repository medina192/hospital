
const Hospital = require('../models/hospital');

const getHospitals = async(req, res) => {

    const hospitals = await Hospital.find({})
                                        .populate('user','name img');

    res.json({
        message: 'get Hosiptals',
        hospitals
    })
}

const createHospitals = async(req, res) => {

    
    const uid = req.uid;
    const hospital = new Hospital({
        user: uid,
        ...req.body
    });


    try{

        const hospitalDb = await hospital.save();

        res.json({
            message: 'create Hosiptals',
            hospitalDb
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Talk to the administrator',
            ubication: 'createHospital'
        });
    }


}

const updateHospitals = (req, res) => {

    res.json({
        message: 'update Hosiptals'
    })
}

const deleteHospitals = (req, res) => {

    res.json({
        message: 'delete Hosiptals'
    })
}

module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals,
}