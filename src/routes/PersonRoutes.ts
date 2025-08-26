
import express = require('express');
const router = express.Router();
import {getExternalIds, getPersonById} from '../controller/PersonController';

router.get('/:id/externalIds', getExternalIds)
router.get('/:id', getPersonById)


module.exports = router;