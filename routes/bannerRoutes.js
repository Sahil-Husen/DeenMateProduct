import {addBanner,getbanner,updateBanner,deleteBanner} from '../controllers/bannerController.js'
import express from 'express'
const router = express.Router()
import upload from '../middleware/uploadMiddleware.js'



router.post('/upload-banner',upload.single("image"),addBanner);
router.get("/get-banner",getbanner);
router.put("/update-banner/:id",upload.single("image"),updateBanner)
router.delete("/delete-banner/:id",deleteBanner)



export default router;