const express = require('express');

const router = express.Router();
const { getMovieById } = require('../Controller/filmController');

router.get('/:id', getMovieById);


module.exports = router;
