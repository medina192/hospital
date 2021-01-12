
const User = require('../models/user');
const Doctor = require('../models/doctors');
const Hospital = require('../models/hospital');

const getAll = async(req, res) => {
    
    const search = req.params.search;
    const regExp = new RegExp(search, 'i');

    //const users = await User.find({name: regExp});
    //const doctors = await Doctor.find({name: regExp});
    //const hospital = await Hospital.find({name: regExp});
    
    const [ users, doctors, hospital ] = await Promise.all([
        User.find({name: regExp}),
        Doctor.find({name: regExp}),
        Hospital.find({name: regExp})
    ]);


    res.json({
        msg: 'get All',
        users,
        doctors,
        hospital
    })
}




const getDocuments = async(req, res) => {
    
    const table = req.params.table;
    const search = req.params.search;
    const regExp = new RegExp(search, 'i');

    let data = [];

    try {
        switch (table) {
            case 'doctors':
                data = await Doctor.find({name: regExp})
                                .populate('hospital','name')
                                .populate('user','name');
                break;
            case 'hospitals':
                data = await Hospital.find({name: regExp})
                                .populate('user','name');
                break;
            case 'users':
                data = await User.find({name: regExp});
                break;
            default:
                return res.status(404).json({
                    ok: false,
                    message: 'The table must be doctors, hospitals or users'
                });
                break;
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error in switch, get Documents'
        });
    }

    res.json({
        msg: 'get documents',
        data
    })
}


module.exports = {
    getAll,
    getDocuments,
}




