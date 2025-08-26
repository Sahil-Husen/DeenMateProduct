import express from 'express'
import {getHomeData} from '../controllers/homeSecAPIController.js'

const router = express.Router()


router.get("/secHome",getHomeData);


export default router;