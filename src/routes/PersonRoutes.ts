
import express = require('express');
const router = express.Router();
import {getExternalIds, getListMoviePerson, getPersonById, getPersonByMovie} from '../controller/PersonController';


router.get('/search', getPersonByMovie)
router.get('/:id/externalIds', getExternalIds)
router.get('/:id/movie_credits', getListMoviePerson)
router.get('/:id', getPersonById)




module.exports = router;