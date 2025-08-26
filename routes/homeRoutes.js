import express from "express";
import { getHomeData } from "../controllers/homeAPIController.js";

const router = express.Router();

router.get("/home", getHomeData);


export default router;