import express, {Router} from "express";
import {
    getCreditTv,
    getOnAirToday,
    getProviderTv,
    getSerieById
} from "../controller/TvSeriesController";

const router : Router = express.Router();

router.get('/on_the_air/', getOnAirToday)
router.get('/:id/watch/provider', getProviderTv)
router.get('/:id/credits', getCreditTv)
router.get('/:id', getSerieById)


export default router;