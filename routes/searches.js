
//     /api/all

const { Router } = require('express');
const {
    getAll,
    getDocuments
} = require('../controllers/searches');
const { validateToken } = require('../middlewares/validateToken');

const router = Router();

router.get('/:search', validateToken, getAll);

router.get('/collection/:table/:search', validateToken, getDocuments);


module.exports = router;





