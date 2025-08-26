import express from 'express'
import {getHomeData} from '../controllers/homeThirdController.js'

const router = express.Router()


router.get("/thirdHome",getHomeData);

export default router;