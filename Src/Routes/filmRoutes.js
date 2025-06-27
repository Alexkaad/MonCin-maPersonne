const express = require('express');

const router = express.Router();
const {getFilmById,upcoming, popular,getIndoor} = require('../Controller/filmController');


router.get(/indoor/,getIndoor);
router.get(/upcoming/,upcoming);
router.get(/popular/,popular);
router.get('/:id', getFilmById);



module.exports = router;
