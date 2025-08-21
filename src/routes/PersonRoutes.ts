
import express = require('express');
const router = express.Router();
import {getPersonById} from '../controller/PersonController';


router.get('/:id', getPersonById)

module.exports = router;