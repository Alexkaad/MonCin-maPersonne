const express = require('express');

const router = express.Router();
const {getFilmById,upcoming, popular,getIndoor, getCredit} = require('../Controller/filmController');


router.get(/indoor/,getIndoor);
router.get(/upcoming/,upcoming);
router.get(/popular/,popular);
router.get('/:id', getFilmById);
router.get('/:id/credits',getCredit );



module.exports = router;
