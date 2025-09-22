import express, {Router} from "express";
import {
    getOnAirToday,
    getProviderTv,
    getSerieById
} from "../controller/TvSeriesController";

const router : Router = express.Router();

router.get('/on_the_air/', getOnAirToday)
router.get('/:id/watch/provider', getProviderTv)
router.get('/:id', getSerieById)


module.exports = router;