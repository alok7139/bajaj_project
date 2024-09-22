import express from "express";
import { register,get } from "../controller/baja.js"

const router = express.Router();
router.post('' , register);
router.get('' , get);


export default router;